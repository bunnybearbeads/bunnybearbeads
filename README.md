# bunnybearbeads

## QR-коды в модалках заказа

Лежат в `public/images/qr/` (`telegram.svg`, `messenger.svg`, `zalo.svg`), выводятся в `src/components/QrModal/`.

Генерируем здесь: https://www.nayuki.io/page/qr-code-generator-library

1. **Text** — полная ссылка с `https://`, например `https://m.me/bunnybearbeads`.
2. **Error correction** — Quartile.
3. **Output format** — Vector.
4. **Border** — 0.
5. Остальное не менять. Скачать SVG и положить в `public/images/qr/`.

После скачивания открыть SVG в редакторе:

- **Обязательно удалить белый фон** — строку `<rect width="100%" height="100%" fill="#FFFFFF"/>`. QR в модалке работает как маска: градиентом закрашивается всё непрозрачное, и с фоном вместо кода получится сплошной цветной квадрат.
- В тег `<svg>` добавить `width="500" height="500" shape-rendering="crispEdges"` — размер как у остальных и чёткие края клеток.

Проверить телефоном прямо из модалки на сайте, а не из самого файла: в файле код читается и с фоном.

Настоящий номер Zalo в README и код не писать. Как он спрятан — в `TODO.md`, раздел «Как спрятан номер Zalo».
