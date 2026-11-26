import HystModal from 'hystmodal';
import { isMobile } from './breakpoints';

/**
 * Ссылка, которая на десктопе открывает модалку, а на мобильном ведёт по своему href.
 * С data-modal-always — модалка везде (ссылки «Напишите мне» → #modal-contact)
 */
const MODAL_LINK = 'a[href][data-hystmodal]:not([data-modal-always])';

/** Клик с модификатором — человек хочет новую вкладку, не мешаем */
const isModifiedClick = (event: MouseEvent): boolean =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

export function initModals() {
  // Ловим на погружении, до обработчика HystModal: он отменяет переход у всех своих ссылок
  document.addEventListener(
    'click',
    (event) => {
      if (!(event.target instanceof Element) || !event.target.closest(MODAL_LINK)) return;
      if (isMobile() || isModifiedClick(event)) event.stopPropagation();
    },
    true
  );

  new HystModal({
    linkAttributeName: 'data-hystmodal',
    catchFocus: true,
    waitTransitions: true,
    closeOnEsc: true,
    closeOnOverlay: true,
  });
}
