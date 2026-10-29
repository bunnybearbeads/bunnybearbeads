import HystModal from 'hystmodal';
import 'hystmodal/css';
import {
  formatAuditRelativeDate,
  formatAuditRelativeOnly,
  type SupportedLanguage,
} from '../../i18n/utils';
import { initSimpleLightbox } from '../../utils';

function updateAuditDates() {
  try {
    const lang = (document.documentElement.lang || 'en') as SupportedLanguage;
    document.querySelectorAll<HTMLElement>('[data-audit-date]').forEach((el) => {
      const dateStr = el.getAttribute('data-audit-date');
      if (dateStr) {
        el.textContent = formatAuditRelativeDate(dateStr, lang);
      }
    });
    document.querySelectorAll<HTMLElement>('[data-audit-relative]').forEach((el) => {
      const dateStr = el.getAttribute('data-audit-relative');
      if (dateStr) {
        el.textContent = `(${formatAuditRelativeOnly(dateStr, lang)})`;
      }
    });
  } catch {
    // Keep SSR fallback
  }
}

function updateDalatCutoffs() {
  try {
    const scheduleWrap = document.querySelector('[data-schedule-cutoff]');
    const openHour = scheduleWrap ? parseInt(scheduleWrap.getAttribute('data-schedule-open') || '10', 10) : 10;
    const cutoffHour = scheduleWrap ? parseInt(scheduleWrap.getAttribute('data-schedule-cutoff') || '19', 10) : 19;

    const vnHour = parseInt(
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: 'numeric',
        hour12: false,
      }).format(new Date()),
      10
    );

    document.querySelectorAll('.dalat-dynamic-cutoff-text').forEach((el) => {
      if (vnHour >= cutoffHour) {
        const tomorrowText = el.getAttribute('data-text-tomorrow');
        if (tomorrowText) el.innerHTML = tomorrowText;
      } else if (vnHour < openHour && el.hasAttribute('data-text-morning')) {
        const morningText = el.getAttribute('data-text-morning');
        if (morningText) el.innerHTML = morningText;
      } else {
        const todayText = el.getAttribute('data-text-today');
        if (todayText) el.innerHTML = todayText;
      }
    });
  } catch {
    // Fallback: keep static default
  }
}

function initProductDetail() {
  updateDalatCutoffs();
  updateAuditDates();
  if (document.querySelector('[data-option-photos]')) {
    initSimpleLightbox('[data-option-photos]', '[data-option-photo]');
  }
}

function initModals() {
  const myModal = new HystModal({
    linkAttributeName: 'data-hystmodal',
    catchFocus: true,
    waitTransitions: true,
    closeOnEsc: true,
    closeOnOverlay: true,
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initProductDetail();
    initModals();
  });
} else {
  initProductDetail();
  initModals();
}
