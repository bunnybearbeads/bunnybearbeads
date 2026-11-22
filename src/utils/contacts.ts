/**
 * Номер телефона для ссылки Zalo не пишем в разметку открытым текстом: спам-боты собирают
 * номера прямо из HTML. На сборке кладём его закодированным в data-zalo, а настоящую ссылку
 * собираем, когда посетитель взаимодействует с кнопкой заказа.
 */
export const encodePhone = (phone: string): string => btoa([...phone].reverse().join(''));

const decodePhone = (code: string): string => [...atob(code)].reverse().join('');

function revealZaloLinks() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-zalo]').forEach((link) => {
    const address = `zalo.me/${decodePhone(link.dataset.zalo ?? '')}`;
    link.href = `https://${address}`;
    link.removeAttribute('data-zalo');

    const text = link.querySelector('[data-zalo-text]');
    if (text) text.textContent = address;
  });
}

export function initContacts() {
  const onInteract = (event: Event) => {
    if (event.target instanceof Element && event.target.closest('a[data-zalo]')) revealZaloLinks();
  };

  // pointerdown — мышь и касание (в том числе среднюю кнопку и долгое нажатие), click — клавиатура.
  // На погружении: ссылка должна быть готова до перехода и до открытия модалки
  document.addEventListener('pointerdown', onInteract, true);
  document.addEventListener('click', onInteract, true);
}
