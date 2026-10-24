/**
 * AI: Встроенная галерея карточки товара (Embla Carousel).
 *
 * Ключевые архитектурные принципы работы с видео:
 *
 * 1. ЧИСТЫЙ СТАРТ НА МОБИЛЬНЫХ УСТРОЙСТВАХ (iOS Safari / Android):
 *    - По умолчанию на смартфонах видео запускается без нативных контролов (`controls = false`).
 *      Это сделано намеренно: в iOS Safari наличие `controls` вызывает отрисовку тяжелого
 *      полупрозрачного черного оверлея во весь кадр с огромными кнопками перемотки по центру,
 *      которые перекрывают изображение ювелирного изделия.
 *    - При первом тапе пользователя по видео мы динамически включаем контролы (`video.controls = true`),
 *      сразу же ставим видео на паузу (`video.pause()`) и помечаем как осознанную паузу пользователя (`userPaused = true`).
 *      Это даёт пользователю возможность изучить детали кадра, подвигать таймлайн или продолжить просмотр.
 *
 * 2. ПАМЯТЬ СОСТОЯНИЯ ПОЛЬЗОВАТЕЛЯ И АСИНХРОННОСТЬ HTML5 ПАУЗЫ:
 *    - Когда пользователь уходит со слайда с видео, карусель принудительно останавливает его в фоне (`video.pause()`).
 *    - В спецификации HTML5 вызов `video.pause()` обрабатывается асинхронно в очереди задач браузера.
 *      Чтобы фоновое глушение не считалось за осознанную паузу пользователя, обработчик `pause` проверяет:
 *      `videoSlideIndex === currentSlideIndex && !isPhotoSwipeOpen && !document.querySelector('.pswp--open')`.
 *    - Если пользователь просто листал слайды дальше — при возвращении на слайд видео продолжается автоматически.
 *    - Если пользователь сам нажал паузу на активном слайде — при возвращении видео остаётся на паузе.
 *
 * 3. СОХРАНЕНИЕ ВРЕМЕНИ ВОСПРОИЗВЕДЕНИЯ (`currentTime`):
 *    - Позиция видео непрерывно сохраняется, чтобы при возвращении к слайду или переходе в полноэкранный
 *      PhotoSwipe видео продолжалось ровно с той секунды, на которой пользователь остановился, без сброса на 0:00.
 */

import EmblaCarousel from 'embla-carousel';
import {
  isMobile,
  BREAKPOINTS,
  setAttrIfChanged,
  setHiddenIfChanged,
  isEditableTarget,
} from '../../utils';
import type { VideoPlaybackState } from './types';
import { openPhotoSwipe } from './galleryLightbox';

const THUMBS_SCROLL_STEP = 4;

export function initGallery(galleryRoot: HTMLElement): void {
  const mainNode = galleryRoot.querySelector<HTMLElement>('[data-gallery-main]');
  const thumbsNode = galleryRoot.querySelector<HTMLElement>('[data-gallery-thumbs]');
  const mainPrevBtn = galleryRoot.querySelector<HTMLButtonElement>('[data-gallery-main-prev]');
  const mainNextBtn = galleryRoot.querySelector<HTMLButtonElement>('[data-gallery-main-next]');
  const prevBtn = galleryRoot.querySelector<HTMLButtonElement>('[data-gallery-thumbs-prev]');
  const nextBtn = galleryRoot.querySelector<HTMLButtonElement>('[data-gallery-thumbs-next]');
  const videos = Array.from(galleryRoot.querySelectorAll<HTMLVideoElement>('[data-gallery-video]'));
  const thumbSlides = Array.from(
    galleryRoot.querySelectorAll<HTMLElement>('[data-gallery-thumb-slide]')
  );

  if (!mainNode || !thumbsNode) return;

  // Embla Carousels initialization
  const emblaMain = EmblaCarousel(mainNode, {
    loop: false,
    align: 'start',
    axis: 'y',
    watchDrag: (embla) => embla.canScrollPrev() || embla.canScrollNext(),
    breakpoints: {
      [BREAKPOINTS.mobile]: { axis: 'x' },
    },
  });

  const emblaThumbs = EmblaCarousel(thumbsNode, {
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    axis: 'y',
    watchDrag: (embla) => embla.canScrollPrev() || embla.canScrollNext(),
    breakpoints: {
      [BREAKPOINTS.mobile]: { axis: 'x' },
    },
  });

  // Update main stage arrow controls
  const updateMainNav = () => {
    const canPrev = emblaMain.canScrollPrev();
    const canNext = emblaMain.canScrollNext();
    const isScrollable = canPrev || canNext;

    if (mainPrevBtn && mainNextBtn) {
      if (!isScrollable) {
        setHiddenIfChanged(mainPrevBtn, true);
        setHiddenIfChanged(mainNextBtn, true);
      } else {
        setHiddenIfChanged(mainPrevBtn, false);
        setHiddenIfChanged(mainNextBtn, false);
        if (mainPrevBtn.disabled !== !canPrev) mainPrevBtn.disabled = !canPrev;
        if (mainNextBtn.disabled !== !canNext) mainNextBtn.disabled = !canNext;
      }
    }
  };

  // Update thumbnails ribbon arrow controls
  const updateThumbsNav = () => {
    if (!prevBtn || !nextBtn) return;

    const canPrev = emblaThumbs.canScrollPrev();
    const canNext = emblaThumbs.canScrollNext();
    const isScrollable = canPrev || canNext;

    if (!isScrollable) {
      setHiddenIfChanged(prevBtn, true);
      setHiddenIfChanged(nextBtn, true);
      return;
    }

    setHiddenIfChanged(prevBtn, false);
    setHiddenIfChanged(nextBtn, false);
    if (prevBtn.disabled !== !canPrev) prevBtn.disabled = !canPrev;
    if (nextBtn.disabled !== !canNext) nextBtn.disabled = !canNext;
  };

  // Keep active thumbnail in view and highlight it
  const syncSelectedThumb = (jump = false) => {
    const selectedIndex = emblaMain.selectedScrollSnap();
    const maxSnap = Math.max(0, emblaThumbs.scrollSnapList().length - 1);
    const targetSnap = Math.max(0, Math.min(maxSnap, selectedIndex - 2));
    if (jump || emblaThumbs.selectedScrollSnap() !== targetSnap) {
      emblaThumbs.scrollTo(targetSnap, jump);
    }

    thumbSlides.forEach((slide, idx) => {
      const isSelected = idx === selectedIndex;
      if (slide.classList.contains('gallery__thumbnail--current') !== isSelected) {
        slide.classList.toggle('gallery__thumbnail--current', isSelected);
      }
      if (isSelected) {
        setAttrIfChanged(slide, 'aria-current', 'true');
      } else if (slide.hasAttribute('aria-current')) {
        slide.removeAttribute('aria-current');
      }
    });

    updateMainNav();
    updateThumbsNav();
    syncPageVideoPlayback();
  };

  // Persistent state memory for page videos by slide index
  const pageVideoStates = new Map<number, VideoPlaybackState>();
  let isPhotoSwipeOpen = false;

  const pageSlideNodes = emblaMain.slideNodes();
  pageSlideNodes.forEach((slide, idx) => {
    if (slide.querySelector('video')) {
      pageVideoStates.set(idx, {
        userPaused: false,
        hasControls: !isMobile(),
        currentTime: 0,
      });
    }
  });

  // Sync page video playback: auto-play active video if not user-paused; pause background videos
  const syncPageVideoPlayback = () => {
    const selectedIndex = emblaMain.selectedScrollSnap();
    const currentSlides = emblaMain.slideNodes();

    currentSlides.forEach((slide, idx) => {
      const video = slide.querySelector<HTMLVideoElement>('video');
      if (!video) return;

      let state = pageVideoStates.get(idx);
      if (!state) {
        state = { userPaused: false, hasControls: !isMobile(), currentTime: 0 };
        pageVideoStates.set(idx, state);
      }

      if (idx === selectedIndex) {
        if (!state.userPaused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      } else {
        video.pause();
      }
    });
  };

  const handleOpenLightbox = (initialIndex: number) => {
    openPhotoSwipe({
      initialIndex,
      emblaMain,
      pageVideoStates,
      pageVideos: videos,
      onStateChange: (isOpen) => {
        isPhotoSwipeOpen = isOpen;
      },
      onSyncPage: () => {
        syncSelectedThumb(true);
        syncPageVideoPlayback();
      },
    });
  };

  // Open PhotoSwipe by clicking main slide (ignore direct video clicks)
  mainNode.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('video') || target.tagName === 'VIDEO') return;

    const slide = target.closest('.gallery__item');
    if (!slide) return;

    const slides = emblaMain.slideNodes();
    const index = slides.indexOf(slide as HTMLElement);
    if (index !== -1) {
      handleOpenLightbox(index);
    }
  });

  // Gallery focus tracking (for Up/Down page navigation)
  let isGalleryFocused = false;

  window.addEventListener('click', (event) => {
    isGalleryFocused = galleryRoot.contains(event.target as Node);
  });

  window.addEventListener(
    'scroll',
    () => {
      isGalleryFocused = false;
    },
    { passive: true }
  );

  galleryRoot.addEventListener('focusin', () => {
    isGalleryFocused = true;
  });

  galleryRoot.addEventListener('focusout', (event) => {
    if (!galleryRoot.contains(event.relatedTarget as Node)) {
      isGalleryFocused = false;
    }
  });

  // Keyboard navigation for embedded gallery (blocked in modals, PhotoSwipe, and form inputs)
  window.addEventListener('keydown', (event) => {
    if (
      isEditableTarget(event.target) ||
      isEditableTarget(document.activeElement) ||
      document.querySelector('.pswp--open') ||
      document.documentElement.classList.contains('hystmodal__opened') ||
      document.querySelector('.hystmodal--active') ||
      document.querySelector('dialog[open]')
    ) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      emblaMain.scrollPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      emblaMain.scrollNext();
    } else if (isGalleryFocused) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        emblaMain.scrollPrev();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        emblaMain.scrollNext();
      }
    }
  });

  // Thumbnail click switches main photo
  thumbSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      emblaMain.scrollTo(index);
    });
  });

  // Main stage prev/next buttons
  if (mainPrevBtn) {
    mainPrevBtn.addEventListener('click', () => {
      emblaMain.scrollPrev();
    });
  }

  if (mainNextBtn) {
    mainNextBtn.addEventListener('click', () => {
      emblaMain.scrollNext();
    });
  }

  // Thumbnail ribbon prev/next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const target = Math.max(0, emblaThumbs.selectedScrollSnap() - THUMBS_SCROLL_STEP);
      emblaThumbs.scrollTo(target);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxSnap = emblaThumbs.scrollSnapList().length - 1;
      const target = Math.min(maxSnap, emblaThumbs.selectedScrollSnap() + THUMBS_SCROLL_STEP);
      emblaThumbs.scrollTo(target);
    });
  }

  // Video fullscreen button in top-right corner opens PhotoSwipe
  const videoFsBtns = Array.from(
    galleryRoot.querySelectorAll<HTMLButtonElement>('[data-gallery-video-fs]')
  );

  videoFsBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const slide = btn.closest('.gallery__item');
      const slides = emblaMain.slideNodes();
      const index = slide ? slides.indexOf(slide as HTMLElement) : -1;
      if (index !== -1) {
        handleOpenLightbox(index);
      }
    });

    btn.addEventListener('pointerdown', (event) => {
      event.stopPropagation();
    });
  });

  // На десктопе контролы включены сразу; на смартфонах контролы скрыты до первого тапа (избегаем темного оверлея iOS Safari)
  const updateVideoControlsForDevice = () => {
    const mobile = isMobile();
    videos.forEach((video) => {
      const slide = video.closest('.gallery__item');
      const videoSlideIndex = slide ? pageSlideNodes.indexOf(slide as HTMLElement) : -1;
      const state = pageVideoStates.get(videoSlideIndex);

      if (mobile) {
        const showControls = state ? state.hasControls : false;
        video.controls = showControls;
        if (!showControls) video.removeAttribute('controlslist');
      } else {
        video.controls = true;
        video.setAttribute('controlslist', 'nofullscreen');
        if (state) state.hasControls = true;
      }
    });
  };
  updateVideoControlsForDevice();
  window.addEventListener('resize', updateVideoControlsForDevice);

  // Обработка взаимодействия с видео и отслеживание пользовательского состояния
  videos.forEach((video) => {
    const slide = video.closest('.gallery__item');
    const videoSlideIndex = slide ? pageSlideNodes.indexOf(slide as HTMLElement) : -1;

    let wasPausedOnPointerDown = false;
    let pointerDownPos = { x: 0, y: 0 };

    // Запоминаем состояние паузы до того, как сработает нативное действие клика браузера
    video.addEventListener('pointerdown', (event) => {
      if (isMobile()) return;
      pointerDownPos = { x: event.clientX, y: event.clientY };
      wasPausedOnPointerDown = video.paused;
    });

    video.addEventListener('click', (event) => {
      event.stopPropagation();
      const state = pageVideoStates.get(videoSlideIndex);

      // На мобильных первый тап: 1) показывает контролы, 2) ставит видео на паузу, 3) сохраняет userPaused = true
      if (isMobile()) {
        if (state && !state.hasControls) {
          state.hasControls = true;
          state.userPaused = true;
          video.controls = true;
          video.pause();
        }
        return;
      }

      // Если пользователь тянул/свайпал карусель через видео, не переключаем паузу
      const moveDistance = Math.hypot(
        event.clientX - pointerDownPos.x,
        event.clientY - pointerDownPos.y
      );
      if (moveDistance > 6) return;

      // На десктопе клик по телу видео (выше нижней полосы контролов) переключает play/pause
      const rect = video.getBoundingClientRect();
      const isControlsBar = event.clientY >= rect.bottom - 56;
      if (!isControlsBar) {
        if (wasPausedOnPointerDown) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });

    video.addEventListener('timeupdate', () => {
      const state = pageVideoStates.get(videoSlideIndex);
      if (state) {
        state.currentTime = video.currentTime;
      }
    });

    // Отслеживание осознанной паузы пользователем на активном слайде.
    // Фоновые остановки при смене слайда или открытии лайтбокса НЕ выставляют userPaused: true.
    video.addEventListener('pause', () => {
      const currentSlideIndex = emblaMain.selectedScrollSnap();
      if (
        videoSlideIndex === currentSlideIndex &&
        !isPhotoSwipeOpen &&
        !document.querySelector('.pswp--open')
      ) {
        const state = pageVideoStates.get(videoSlideIndex);
        if (state) {
          state.userPaused = true;
          state.currentTime = video.currentTime;
        }
      }
    });

    // Если пользователь вручную запустил видео, сбрасываем флаг паузы
    video.addEventListener('play', () => {
      const currentSlideIndex = emblaMain.selectedScrollSnap();
      if (videoSlideIndex === currentSlideIndex) {
        const state = pageVideoStates.get(videoSlideIndex);
        if (state) state.userPaused = false;
      }
    });
  });

  // Grabbing cursor management (only when actively dragging)
  const bindDragCursor = (embla: ReturnType<typeof EmblaCarousel>) => {
    let isPointerDown = false;
    embla.on('pointerDown', () => {
      isPointerDown = true;
    });
    embla.on('scroll', () => {
      if (isPointerDown) {
        document.documentElement.classList.add('is-dragging');
      }
    });
    embla.on('pointerUp', () => {
      isPointerDown = false;
      document.documentElement.classList.remove('is-dragging');
    });
    embla.on('settle', () => {
      document.documentElement.classList.remove('is-dragging');
    });
  };

  bindDragCursor(emblaMain);
  bindDragCursor(emblaThumbs);

  // Embla event subscriptions
  emblaMain.on('init', updateMainNav);
  emblaMain.on('select', () => {
    syncSelectedThumb(false);
    syncPageVideoPlayback();
  });
  emblaMain.on('reInit', () => {
    syncSelectedThumb(true);
    syncPageVideoPlayback();
  });

  emblaThumbs.on('init', updateThumbsNav);
  emblaThumbs.on('reInit', updateThumbsNav);
  emblaThumbs.on('select', updateThumbsNav);

  // Initial state setup
  updateMainNav();
  updateThumbsNav();
  syncPageVideoPlayback();
}

export function initGalleries(): void {
  const galleries = document.querySelectorAll<HTMLElement>('[data-gallery]');
  galleries.forEach(initGallery);
}
