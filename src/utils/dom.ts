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
