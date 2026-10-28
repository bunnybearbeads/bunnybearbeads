/**
 * DOM utility functions
 */

/**
 * Sets an attribute only if its value has actually changed,
 * preventing unnecessary DOM mutations and observer triggers.
 */
export const setAttrIfChanged = (el: Element, attr: string, value: string): void => {
  if (el.getAttribute(attr) !== value) {
    el.setAttribute(attr, value);
  }
};

/**
 * Updates an element's `hidden` property only if changed.
 */
export const setHiddenIfChanged = (el: HTMLElement, isHidden: boolean): void => {
  if (el.hidden !== isHidden) {
    el.hidden = isHidden;
  }
};

/**
 * Checks if an event target is an editable form element or contenteditable container.
 * Commonly used to ignore global keyboard shortcuts while typing.
 */
export const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!target || !(target instanceof HTMLElement)) return false;
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.isContentEditable ||
    Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
  );
};

/**
 * Reads the modal backdrop opacity from CSS variables (`--modal-backdrop-opacity` or `--modal-bg`).
 * Returns a number between 0 and 1 for PhotoSwipe's `bgOpacity` option (e.g. 0.8).
 */
export const getModalBgOpacity = (): number => {
  if (typeof window === 'undefined') return 0.8;
  try {
    const rootStyle = getComputedStyle(document.documentElement);
    const rawOpacity = rootStyle.getPropertyValue('--modal-backdrop-opacity').trim();
    if (rawOpacity) {
      const num = parseFloat(rawOpacity);
      if (!isNaN(num)) {
        return rawOpacity.endsWith('%') || num > 1 ? num / 100 : num;
      }
    }
    const rawBg = rootStyle.getPropertyValue('--modal-bg').trim();
    if (rawBg) {
      const match = rawBg.match(/\/\s*([\d.]+)%?\s*\)/);
      if (match) {
        const val = parseFloat(match[1]);
        return rawBg.includes('%') || val > 1 ? val / 100 : val;
      }
    }
  } catch {
    // Keep fallback
  }
  return 0.8;
};
