# Список задач

## Контент
- Решить, переводить ли описания товаров (сейчас ru/vi — копия английского) или держать английскими, как названия
- Фото вместо заглушек `emblem-squared.webp`
- Страницы Where to buy и Legal (что должно быть — READ-ME-NOW.md)
- Zalo: после деплоя проверить на телефоне (Android и iPhone), что кнопка Zalo и QR из модалки открывают чат с нашим номером, а не заглушку `zalo.me/84000000000`. Если заглушка — секрет `ZALO_PHONE` (Actions → Repository secrets) не дошёл до сборки
- Zalo: при смене номера обновить секрет `ZALO_PHONE` (84 + номер без нуля; текстом в коде номер не писать), QR `public/images/qr/zalo.svg` (SVG без полей и без белого фона) и заново запустить Deploy to Pages
- Cat Food — демо-магазин; к запуску договориться или убрать
- Дату проверки витрин (`siteSettings.partnerShops.lastCheckedAt`) обновлять раз в неделю. Она одна на все магазины
- Написание BunnyBearBeads → bunnybearbeads в title, футере, шапке

## Код
- Собрать переводы в одно место: сейчас они в `ui.ts`, в словарях компонентов (ProductAvailability, RemakeModal) и в `siteSettings.ts`
- `siteSettings.ts`: нигде не вызываются `getPaymentNotesText`, `getRemakeStockPillText` и др.; `getCourierScheduleText` и `getPickupScheduleText` одинаковые
- Токены цвета: `--accent-teal*` на деле шоколадные, `--color-brand-dark` дублирует `--accent-teal`
- Иконки Material Symbols: локальный файл вместо Google Fonts
- Поиск в шапке: ведёт на `/catalog?q=…`, но `q` никто не читает, и теряется язык
- Иконка корзины в шапке, хотя корзины нет
- Смартфон в альбомной ориентации шире 740px, поэтому сайт считает его десктопом: и CSS (`width < 740px`), и JS (`isMobile()` в `utils/breakpoints.ts`). Решить, что делать с этим запросом в целом. Пример — кнопки заказа: на 844×390 вместо перехода в мессенджер открывается модалка с QR. Через `isMobile()` работают ещё Gallery и galleryLightbox. Вариант для поведения — `(pointer: coarse)`, но под него попадут и планшеты

## SEO
- canonical, hreflang, og:image, sitemap (`site` в astro.config.mjs уже задан)
- Ссылки без слеша на конце: GitHub Pages делает лишний редирект `/catalog` → `/catalog/`
- Страница 404
- Header читает `?category` во время сборки — на статике он всегда пустой
