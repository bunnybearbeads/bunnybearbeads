import PhotoSwipe, { type PhotoSwipeOptions } from 'photoswipe';
import 'photoswipe/style.css';
import { getModalBgOpacity } from './dom';

export interface CreatePhotoSwipeOptions extends PhotoSwipeOptions {
  /**
   * If true, captures Escape and Tab keydown events during the capture phase
   * so parent dialogs (e.g. HystModal) do not close or hijack focus.
   */
  trapModalKeys?: boolean;
}

/**
 * Creates and returns a configured PhotoSwipe instance with project-wide defaults:
 * - Background opacity derived from CSS variable (--modal-bg / 80%)
 * - No looping: navigation stops at the first and last slide
 * - Smooth wheelToZoom and closeOnVerticalDrag
 * - Predictable click-to-zoom (2.2x magnification even on smaller/medium images)
 * - Maximum zoom level up to 4x
 * - Vertical keyboard navigation (ArrowUp/ArrowDown) in addition to ArrowLeft/ArrowRight
 * - Optional modal key trapping (Escape / Tab isolation)
 */
export function createPhotoSwipe(options: CreatePhotoSwipeOptions): PhotoSwipe {
  const { trapModalKeys, ...restOptions } = options;

  const pswp = new PhotoSwipe({
    bgOpacity: getModalBgOpacity(),
    loop: false,
    wheelToZoom: true,
    closeOnVerticalDrag: true,
    secondaryZoomLevel: (zoomLevel) => Math.max(1, zoomLevel.fit * 2.2),
    maxZoomLevel: (zoomLevel) => Math.max(2.5, zoomLevel.fit * 4),
    ...restOptions,
  });

  // Enable ArrowUp/ArrowDown navigation inside PhotoSwipe (next/prev)
  pswp.on('keydown', (e) => {
    const key = e.originalEvent?.key;
    if (key === 'ArrowDown') {
      e.preventDefault();
      e.originalEvent?.preventDefault();
      pswp.next();
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      e.originalEvent?.preventDefault();
      pswp.prev();
    }
  });

  // Trap Escape and Tab so parent modals (like HystModal) don't close prematurely
  if (trapModalKeys) {
    const onKeyDownCapture = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        event.preventDefault();
        pswp.close();
      } else if (event.key === 'Tab') {
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener('keydown', onKeyDownCapture, true);

    pswp.on('destroy', () => {
      window.removeEventListener('keydown', onKeyDownCapture, true);
    });
  }

  return pswp;
}

/** Большой размер фото для лайтбокса из data-pswp-* (photoLarge в utils/photos.ts) */
export function largePhoto(el: HTMLElement): { src: string; width: number; height: number } | undefined {
  const { pswpSrc, pswpWidth, pswpHeight } = el.dataset;
  if (!pswpSrc) return undefined;
  return { src: pswpSrc, width: Number(pswpWidth), height: Number(pswpHeight) };
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Подпись под фото: из data-pswp-caption-title (жирным) и data-pswp-caption у ссылки.
 * У PhotoSwipe своей подписи нет — добавляем элемент интерфейса и обновляем его при смене слайда
 */
function addCaption(pswp: PhotoSwipe): void {
  pswp.on('uiRegister', () => {
    pswp.ui?.registerElement({
      name: 'custom-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      onInit: (el) => {
        pswp.on('change', () => {
          const { captionTitle, caption } = (pswp.currSlide?.data ?? {}) as { captionTitle?: string; caption?: string };
          el.innerHTML = [
            captionTitle ? `<strong class="pswp__custom-caption-title">${escapeHtml(captionTitle)}</strong>` : '',
            caption ? escapeHtml(caption) : '',
          ].filter(Boolean).join(' ');
          el.hidden = !captionTitle && !caption;
        });
      },
    });
  });
}

export interface OpenSimpleLightboxOptions {
  items: HTMLAnchorElement[];
  initialIndex?: number;
  triggerElement?: HTMLElement;
  trapModalKeys?: boolean;
}

/**
 * Opens a simple image-only PhotoSwipe lightbox from an array of anchor elements.
 */
export function openSimpleLightbox({
  items,
  initialIndex = 0,
  triggerElement,
  trapModalKeys = true,
}: OpenSimpleLightboxOptions): PhotoSwipe {
  const dataSource = items.map((item) => {
    const img = item.querySelector<HTMLImageElement>('img');
    const naturalW = img?.naturalWidth || 0;
    const naturalH = img?.naturalHeight || 0;
    const thumbCropped = Boolean(
      item.dataset.pswpCropped !== undefined ||
      item.dataset.cropped !== undefined ||
      (img && window.getComputedStyle(img).objectFit === 'cover')
    );
    const large = largePhoto(item);
    const { pswpCaptionTitle, pswpCaption } = item.dataset;
    return {
      src: large?.src || item.href || img?.currentSrc || img?.src || '',
      width: large?.width || (naturalW > 0 ? naturalW : 1200),
      height: large?.height || (naturalH > 0 ? naturalH : 900),
      alt: img?.alt || '',
      msrc: img?.src || item.href || '',
      element: img || item,
      thumbCropped,
      captionTitle: pswpCaptionTitle,
      caption: pswpCaption,
    };
  });

  const pswp = createPhotoSwipe({
    dataSource,
    index: initialIndex >= 0 ? initialIndex : 0,
    trapModalKeys,
  });
  if (dataSource.some((item) => item.caption || item.captionTitle)) addCaption(pswp);

  // Resolve real dimensions asynchronously for any image that wasn't decoded yet
  items.forEach((item, idx) => {
    const img = item.querySelector<HTMLImageElement>('img');
    if (item.dataset.pswpWidth || (img && img.naturalWidth > 0)) return;
    const src = dataSource[idx]?.src;
    if (!src) return;
    const probe = new Image();
    probe.onload = () => {
      if (probe.naturalWidth > 0 && probe.naturalHeight > 0) {
        dataSource[idx].width = probe.naturalWidth;
        dataSource[idx].height = probe.naturalHeight;
        pswp.refreshSlideContent(idx);
      }
    };
    probe.src = src;
  });

  if (triggerElement) {
    pswp.on('destroy', () => {
      triggerElement.focus();
    });
  }

  pswp.init();
  return pswp;
}

const initializedGalleries = new Set<string>();

/**
 * Attaches a delegated click handler for simple lightboxes matching selector pairs.
 * Safe to call multiple times (idempotent per container+item selector).
 */
export function initSimpleLightbox(
  containerSelector = '[data-lightbox-gallery]',
  itemSelector = 'a'
): void {
  if (typeof document === 'undefined') return;

  const key = `${containerSelector}::${itemSelector}`;
  if (initializedGalleries.has(key)) return;
  initializedGalleries.add(key);

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest<HTMLAnchorElement>(itemSelector);
    if (!link) return;

    const container = link.closest<HTMLElement>(containerSelector);
    if (!container) return;

    e.preventDefault();

    const items = Array.from(container.querySelectorAll<HTMLAnchorElement>(itemSelector));
    const initialIndex = items.indexOf(link);
    const isInsideModal = Boolean(link.closest('.hystmodal, [role="dialog"]'));

    openSimpleLightbox({
      items,
      initialIndex: initialIndex >= 0 ? initialIndex : 0,
      triggerElement: link,
      trapModalKeys: isInsideModal,
    });
  });
}
