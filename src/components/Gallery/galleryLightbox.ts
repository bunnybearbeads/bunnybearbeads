/**
 * AI: Полноэкранный просмотр галереи на базе PhotoSwipe v5.
 *
 * Ключевые архитектурные принципы работы с видео:
 *
 * 1. ЧИСТЫЙ СТАРТ НА МОБИЛЬНЫХ УСТРОЙСТВАХ (iOS Safari / Android):
 *    - Видео в лайтбоксе изначально открывается без нативных контролов (`controls = false`),
 *      чтобы Safari не перекрывал кадр темной подложкой с гигантскими кнопками перемотки.
 *    - По первому тапу контролы отображаются (`video.controls = true`), видео ставится на паузу
 *      (`video.pause()`) и помечается как `userPaused = true`.
 *
 * 2. СОХРАНЕНИЕ ПАМЯТИ СКВОЗЬ ВИРТУАЛИЗАЦИЮ DOM В PHOTOSWIPE:
 *    - PhotoSwipe v5 динамически удаляет DOM-элементы слайдов при свайпе дальше чем на 1–2 шага.
 *      При возвращении на слайд элемент создаётся заново из HTML-строки.
 *    - Чтобы состояние не сбрасывалось, `userPaused`, `hasControls` и `currentTime` хранятся не в DOM,
 *      а в персистентной карте `pswpVideoStates = new Map<number, VideoPlaybackState>()` по индексу слайда.
 *    - В HTML-шаблоне видео отсутствует атрибут `autoplay` — воспроизведением управляет исключительно JS:
 *      - Если `userPaused === false` — при возвращении на слайд видео продолжает играть.
 *      - Если `userPaused === true` — видео остаётся на паузе на той же секунде `currentTime`.
 *
 * 3. БЕСШОВНАЯ ДВУСТОРОННЯЯ СИНХРОНИЗАЦИЯ СО СТРАНИЦЕЙ:
 *    - При открытии PhotoSwipe подхватывает статус и точный `currentTime` видео со страницы.
 *    - При закрытии лайтбокса актуальные статусы и время возвращаются обратно в карусель страницы.
 */

import PhotoSwipe from 'photoswipe';
import type { EmblaCarouselType } from 'embla-carousel';
import { isMobile } from '../../utils';
import type { VideoPlaybackState } from './types';

export interface OpenPhotoSwipeOptions {
  initialIndex: number;
  emblaMain: EmblaCarouselType;
  pageVideoStates: Map<number, VideoPlaybackState>;
  pageVideos: HTMLVideoElement[];
  onSyncPage: () => void;
  onStateChange?: (isOpen: boolean) => void;
}

export function openPhotoSwipe({
  initialIndex,
  emblaMain,
  pageVideoStates,
  pageVideos,
  onSyncPage,
  onStateChange,
}: OpenPhotoSwipeOptions): void {
  onStateChange?.(true);

  const currentSlides = emblaMain.slideNodes();
  const mobile = isMobile();

  // Persistent state memory for PhotoSwipe videos by slide index
  const pswpVideoStates = new Map<number, VideoPlaybackState>();

  const dataSource = currentSlides.map((slide, idx) => {
    const video = slide.querySelector<HTMLVideoElement>('video');
    if (video) {
      const videoSrc = video.currentSrc || video.src;
      const posterAttr = video.poster ? `poster="${video.poster}"` : '';

      // Inherit initial state and playback position from page video
      const pageState = pageVideoStates.get(idx);
      const isPlayingOnPage = !video.paused && !video.ended;
      // If the user was watching the video on the page, continue playing in PhotoSwipe!
      const userPaused = isPlayingOnPage ? false : pageState ? pageState.userPaused : false;
      const currentTime = video.currentTime || (pageState ? pageState.currentTime : 0);

      pswpVideoStates.set(idx, {
        userPaused,
        hasControls: pageState ? pageState.hasControls : !mobile,
        currentTime,
      });

      return {
        html: `
          <div class="pswp-video-container">
            <video
              src="${videoSrc}"
              ${posterAttr}
              loop
              muted
              playsinline
              preload="auto"
              data-slide-index="${idx}"
            ></video>
          </div>
        `,
        element: video,
      };
    }

    const img = slide.querySelector<HTMLImageElement>('img.gallery__image');
    const imgSrc = img?.currentSrc || img?.src || '';
    return {
      src: imgSrc,
      width: img?.naturalWidth || 1200,
      height: img?.naturalHeight || 1600,
      alt: img?.alt || '',
      msrc: img?.src || imgSrc,
      element: img || undefined,
    };
  });

  // Pause page videos while lightbox is active
  pageVideos.forEach((v) => v.pause());

  const pswp = new PhotoSwipe({
    dataSource,
    index: initialIndex,
    bgOpacity: 0.85,
    wheelToZoom: true,
    closeOnVerticalDrag: true,
  });

  // Enable ArrowUp/ArrowDown navigation inside PhotoSwipe (next/prev)
  pswp.on('keydown', (e) => {
    const key = e.originalEvent?.key;
    if (key === 'ArrowDown') {
      e.preventDefault();
      e.originalEvent.preventDefault();
      pswp.next();
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      e.originalEvent.preventDefault();
      pswp.prev();
    }
  });

  // Prevent PhotoSwipe from blocking native pointer events on video controls
  pswp.addFilter('preventPointerEvent', (prevent, e) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('video')) {
      return false;
    }
    return prevent;
  });

  // Prevent PhotoSwipe slide dragging when interacting with video controls
  pswp.on('pointerDown', (e) => {
    const target = e.originalEvent?.target as HTMLElement | null;
    const video = target?.closest('video');
    if (video) {
      const rect = video.getBoundingClientRect();
      const isControlsBar = e.originalEvent.clientY >= rect.bottom - 56;
      if (isControlsBar) {
        e.preventDefault();
      }
    }
  });

  // Prevent zooming when clicking/double-tapping video
  pswp.on('doubleTapAction', (e) => {
    const target = e.originalEvent?.target as HTMLElement | null;
    if (target?.closest('video')) {
      e.preventDefault();
    }
  });

  // Setup video controls and user pause tracking in PhotoSwipe
  pswp.on('contentAppend', ({ content }) => {
    const video = content.element?.querySelector<HTMLVideoElement>('video');
    if (!video) return;

    const slideIdx = content.index;
    video.dataset.slideIndex = String(slideIdx);

    let state = pswpVideoStates.get(slideIdx);
    if (!state) {
      const pageState = pageVideoStates.get(slideIdx);
      state = {
        userPaused: pageState ? pageState.userPaused : false,
        hasControls: pageState ? pageState.hasControls : !mobile,
        currentTime: pageState ? pageState.currentTime : 0,
      };
      pswpVideoStates.set(slideIdx, state);
    }

    // Restore saved playback time so video is not reset to 0:00 when returning to slide
    const targetTime = state.currentTime;
    if (targetTime > 0) {
      const restoreTime = () => {
        try {
          if (Math.abs(video.currentTime - targetTime) > 0.3) {
            video.currentTime = targetTime;
          }
        } catch {}
      };
      if (video.readyState >= 1) {
        restoreTime();
      } else {
        video.addEventListener('loadedmetadata', restoreTime, { once: true });
      }
    }

    // Continuously track video playback position in PhotoSwipe
    video.addEventListener('timeupdate', () => {
      const currentState = pswpVideoStates.get(slideIdx);
      if (currentState) {
        currentState.currentTime = video.currentTime;
      }
    });

    // Применяем нативные контролы: на смартфонах скрыты до первого тапа, на десктопе активны сразу
    if (state.hasControls) {
      video.controls = true;
      video.setAttribute('controlslist', 'nofullscreen');
    } else {
      video.controls = false;
      video.removeAttribute('controlslist');
    }

    // Обработка клика/тапа по видео
    let wasPausedOnPointerDown = false;
    let pointerDownPos = { x: 0, y: 0 };

    // Фиксируем реальный статус паузы до того, как браузер отработает свой нативный клик
    video.addEventListener('pointerdown', (event) => {
      if (isMobile()) return;
      pointerDownPos = { x: event.clientX, y: event.clientY };
      wasPausedOnPointerDown = video.paused;
    });

    video.addEventListener('click', (event) => {
      event.stopPropagation();
      const currentState = pswpVideoStates.get(slideIdx);

      // На смартфонах первый тап: показываем нативные контролы и ставим на паузу
      if (isMobile()) {
        if (currentState && !currentState.hasControls) {
          currentState.hasControls = true;
          currentState.userPaused = true;
          video.controls = true;
          video.pause();
        }
        return;
      }

      // Если пользователь перелистывал слайды свайпом по видео, клик игнорируется
      const moveDistance = Math.hypot(
        event.clientX - pointerDownPos.x,
        event.clientY - pointerDownPos.y
      );
      if (moveDistance > 6) return;

      // На десктопе клик по телу видео (выше полосы нативных контролов) переключает воспроизведение/паузу
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

    // Отслеживание осознанной паузы пользователем в PhotoSwipe.
    // Фоновые остановки при свайпе на соседний слайд или при закрытии лайтбокса НЕ меняют флаг userPaused.
    video.addEventListener('pause', () => {
      const currentState = pswpVideoStates.get(slideIdx);
      if (currentState) {
        currentState.currentTime = video.currentTime;
      }
      if (pswp.currIndex === slideIdx && !pswp.isDestroying) {
        if (currentState) {
          currentState.userPaused = true;
        }
      }
    });

    // Сброс флага паузы при явном возобновлении воспроизведения пользователем
    video.addEventListener('play', () => {
      if (pswp.currIndex === slideIdx) {
        const currentState = pswpVideoStates.get(slideIdx);
        if (currentState) {
          currentState.userPaused = false;
        }
      }
    });

    // Если видео добавлено для текущего активного слайда — сразу применяем автостарт (важно при прямом открытии на видео)
    if (slideIdx === pswp.currIndex) {
      if (!state.userPaused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  });

  // Sync video playback: auto-play active video if not user-paused; pause non-active videos
  const syncPswpVideoPlayback = () => {
    if (!pswp.element) return;
    const currentIdx = pswp.currIndex;
    const pswpVideos = pswp.element.querySelectorAll<HTMLVideoElement>('video');

    pswpVideos.forEach((video) => {
      const slideIdx = Number(video.dataset.slideIndex);
      let state = pswpVideoStates.get(slideIdx);
      if (!state) {
        state = { userPaused: false, hasControls: !mobile, currentTime: 0 };
        pswpVideoStates.set(slideIdx, state);
      }

      if (slideIdx === currentIdx) {
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

  pswp.on('change', () => {
    syncPswpVideoPlayback();
  });

  pswp.on('contentActivate', () => {
    syncPswpVideoPlayback();
  });

  pswp.on('contentDeactivate', ({ content }) => {
    const video = content.element?.querySelector<HTMLVideoElement>('video');
    if (video) {
      const slideIdx = Number(video.dataset.slideIndex);
      const currentState = pswpVideoStates.get(slideIdx);
      if (currentState) {
        currentState.currentTime = video.currentTime;
      }
      video.pause();
    }
  });

  pswp.on('afterInit', () => {
    syncPswpVideoPlayback();
  });

  pswp.on('openingAnimationEnd', () => {
    syncPswpVideoPlayback();
  });

  // Sync carousel slide when closing lightbox
  pswp.on('close', () => {
    onStateChange?.(false);

    // Sync states back to page
    pswpVideoStates.forEach((state, idx) => {
      const pageState = pageVideoStates.get(idx);
      if (pageState) {
        pageState.userPaused = state.userPaused;
        pageState.hasControls = state.hasControls;
        pageState.currentTime = state.currentTime;
      }
    });

    const container = pswp.element;
    container?.querySelectorAll<HTMLVideoElement>('video').forEach((v) => {
      const slideIdx = Number(v.dataset.slideIndex);
      const state = pswpVideoStates.get(slideIdx);
      if (state) state.currentTime = v.currentTime;
      v.pause();
    });

    const targetIndex = pswp.currIndex;
    emblaMain.scrollTo(targetIndex, true);

    // Sync currentTime and state to active page video
    const activeSlide = emblaMain.slideNodes()[targetIndex];
    const activePageVideo = activeSlide?.querySelector<HTMLVideoElement>('video');
    const activePageState = pageVideoStates.get(targetIndex);
    if (activePageVideo && activePageState && activePageState.currentTime > 0) {
      try {
        activePageVideo.currentTime = activePageState.currentTime;
      } catch {}
    }

    onSyncPage();
  });

  pswp.init();
}
