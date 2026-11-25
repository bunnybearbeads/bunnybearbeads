export const languages = {
  en: {
    code: 'en',
    label: 'EN',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  },
  ru: {
    code: 'ru',
    label: 'RU',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
  },
  vi: {
    code: 'vi',
    label: 'VI',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
  },
} as const;

export type SupportedLanguage = keyof typeof languages;
export const defaultLang: SupportedLanguage = 'en';

import {
  getCourierScheduleText,
  getPickupScheduleText,
  getPartnerShopHoursText,
  getPartnerShopModalHoursText,
  getPartnerShopPaymentDetailsText,
  getPaymentNotesText,
  getPaymentSuffixText,
  getDeliveryVietnamSubnote,
  getRemakeStockPillText,
} from '../config/siteSettings';

const courier = {
  en: getCourierScheduleText('en'),
  ru: getCourierScheduleText('ru'),
  vi: getCourierScheduleText('vi'),
};

const pickup = {
  en: getPickupScheduleText('en'),
  ru: getPickupScheduleText('ru'),
  vi: getPickupScheduleText('vi'),
};

const shopHours = {
  en: getPartnerShopHoursText('en'),
  ru: getPartnerShopHoursText('ru'),
  vi: getPartnerShopHoursText('vi'),
};

const shopModalHours = {
  en: getPartnerShopModalHoursText('en'),
  ru: getPartnerShopModalHoursText('ru'),
  vi: getPartnerShopModalHoursText('vi'),
};

const shopPayment = {
  en: getPartnerShopPaymentDetailsText('en'),
  ru: getPartnerShopPaymentDetailsText('ru'),
  vi: getPartnerShopPaymentDetailsText('vi'),
};

const payment = {
  en: getPaymentNotesText('en'),
  ru: getPaymentNotesText('ru'),
  vi: getPaymentNotesText('vi'),
};

const paymentSuffix = {
  en: getPaymentSuffixText('en'),
  ru: getPaymentSuffixText('ru'),
  vi: getPaymentSuffixText('vi'),
};

const deliveryVnReady = {
  en: getDeliveryVietnamSubnote('en', false),
  ru: getDeliveryVietnamSubnote('ru', false),
  vi: getDeliveryVietnamSubnote('vi', false),
};

const deliveryVnRemake = {
  en: getDeliveryVietnamSubnote('en', true),
  ru: getDeliveryVietnamSubnote('ru', true),
  vi: getDeliveryVietnamSubnote('vi', true),
};

const remakePill = {
  en: getRemakeStockPillText('en'),
  ru: getRemakeStockPillText('ru'),
  vi: getRemakeStockPillText('vi'),
};

export const translations = {

  // Top Bar Links
  'nav.order': {
    en: 'Custom Order',
    ru: 'Заказать украшение',
    vi: 'Đặt làm trang sức',
  },
  'nav.about': {
    en: 'About Us',
    ru: 'О нас',
    vi: 'Về chúng mình',
  },
  'nav.contacts': {
    en: 'Contacts & Socials',
    ru: 'Контакты и соц.сети',
    vi: 'Liên hệ & Mạng xã hội',
  },
  'nav.where_to_buy': {
    en: 'Where to Buy',
    ru: 'Где купить',
    vi: 'Điểm bán',
  },
  'nav.blog': {
    en: 'Blog',
    ru: 'Блог',
    vi: 'Blog',
  },
  'nav.faq': {
    en: 'FAQ — Must Read!',
    ru: 'FAQ — это важно!',
    vi: 'FAQ — Lưu ý quan trọng!',
  },
  'nav.delivery': {
    en: 'Delivery',
    ru: 'Доставка',
    vi: 'Vận chuyển',
  },
  'nav.language': {
    en: 'Language',
    ru: 'Язык',
    vi: 'Ngôn ngữ',
  },

  // Main Categories (Lower Header & Catalog Filters)
  'cat.all': {
    en: 'All',
    ru: 'Всё',
    vi: 'Tất cả',
  },
  // Ключи — категории в единственном числе (src/config/categories.ts), подписи — во множественном
  'cat.charm': {
    en: 'Charms',
    ru: 'Брелоки',
    vi: 'Móc treo charm',
  },
  'cat.bracelet': {
    en: 'Bracelets',
    ru: 'Браслеты',
    vi: 'Vòng tay',
  },
  'cat.ring': {
    en: 'Rings',
    ru: 'Кольца',
    vi: 'Nhẫn',
  },
  'cat.earrings': {
    en: 'Earrings',
    ru: 'Серьги',
    vi: 'Bông tai',
  },
  'cat.pen_wrap': {
    en: 'Pen wraps',
    ru: 'Обмотки для ручек',
    vi: 'Bọc bút',
  },
  'cat.other': {
    en: 'Other',
    ru: 'Разное',
    vi: 'Khác',
  },
  'search.label': {
    en: 'Search',
    ru: 'Поиск',
    vi: 'Tìm kiếm',
  },
  'search.placeholder': {
    en: 'Search jewelry, phone charms, rings...',
    ru: 'Поиск украшений, фончармов, колец...',
    vi: 'Tìm kiếm trang sức, dây đeo, nhẫn...',
  },

  // Site meta
  'site.title': {
    en: 'bunnybearbeads — Handcrafted Beadwork & Artisan Jewelry',
    ru: 'bunnybearbeads — Авторские украшения из бисера & Аксессуары',
    vi: 'bunnybearbeads — Trang sức cườm thủ công & Phụ kiện',
  },
  'site.description': {
    en: 'Unique handmade beadwork jewelry, custom phone charms, rings, and accessories.',
    ru: 'Уникальные авторские украшения из бисера, стильные фончармы на телефон, кольца и браслеты.',
    vi: 'Trang sức cườm thủ công độc bản, dây đeo charm điện thoại, nhẫn và phụ kiện tinh tế.',
  },

  // Catalog UI
  'catalog.title': {
    en: 'Finished Jewelry & Charms',
    ru: 'Каталог украшений & аксессуаров',
    vi: 'Danh Mục Trang Sức & Phụ Kiện',
  },
  'catalog.subtitle': {
    en: 'Artisan handcrafted beaded jewelry, delicate charms, and bespoke accessories',
    ru: 'Авторские украшения ручной работы из бисера, трендовые фончармы и уникальные изделия',
    vi: 'Trang sức cườm thủ công độc bản, dây đeo điện thoại xinh xắn và phụ kiện tinh tế',
  },
  'catalog.in_stock': {
    en: 'In Stock',
    ru: 'В наличии',
    vi: 'Còn hàng',
  },
  'catalog.order_piece': {
    en: 'Order / Inquire',
    ru: 'Заказать',
    vi: 'Đặt mua / Tư vấn',
  },
  'catalog.inquiry.recommended': {
    en: 'Recommended',
    ru: 'Рекомендуем',
    vi: 'Ưu tiên',
  },
  'catalog.inquiry.order_via': {
    en: 'Order via',
    ru: 'Заказать в',
    vi: 'Đặt qua',
  },
  'catalog.inquiry.order': {
    en: 'Order',
    ru: 'Заказать',
    vi: 'Đặt mua',
  },
  'catalog.inquiry.via': {
    en: 'via',
    ru: 'в',
    vi: 'qua',
  },
  'site.logo_alt': {
    en: 'bunnybearbeads logo',
    ru: 'Логотип bunnybearbeads',
    vi: 'Logo bunnybearbeads',
  },
  'qr_modal.hint': {
    en: 'Or open the chat on this same device:',
    ru: 'Или откройте чат на\u00A0этом\u00A0же устройстве:',
    vi: 'Hoặc mở chat ngay trên thiết bị này:',
  },
  'qr_modal.open': {
    en: 'Open {name}',
    ru: 'Открыть {name}',
    vi: 'Mở {name}',
  },
  'qr_modal.telegram_note': {
    en: '(channel direct messages)',
    ru: '(директ канала)',
    vi: '(tin nhắn trực tiếp của kênh)',
  },
  'qr_modal.qr_alt': {
    en: 'QR code: chat with bunnybearbeads in {name}',
    ru: 'QR-код: чат с bunnybearbeads в {name}',
    vi: 'Mã QR: trò chuyện với bunnybearbeads qua {name}',
  },
  'window.close': {
    en: 'Close',
    ru: 'Закрыть',
    vi: 'Đóng',
  },
  'catalog.view_details': {
    en: 'View Details',
    ru: 'Подробнее',
    vi: 'Xem chi tiết',
  },
  'catalog.price_label': {
    en: 'Price',
    ru: 'Стоимость',
    vi: 'Giá',
  },
  'catalog.materials_label': {
    en: 'Materials & Specs',
    ru: 'Характеристики и материалы',
    vi: 'Chất liệu & Thông số',
  },
  'catalog.breadcrumb': {
    en: 'Catalog',
    ru: 'Каталог',
    vi: 'Danh mục',
  },
  'catalog.back_to_catalog': {
    en: 'Back to Catalog',
    ru: 'Назад в каталог',
    vi: 'Quay lại danh mục',
  },
  'catalog.where_to_buy': {
    en: 'Delivery',
    ru: 'Доставка',
    vi: 'Giao hàng',
  },
  // Секция «Полезно знать» под галереей товара — ссылки на модалки и FAQ (ProductGuides)
  'catalog.good_to_know': {
    en: 'Good to know',
    ru: 'Полезно знать',
    vi: 'Điều bạn nên biết',
  },
  // Модалка на странице каждого брелока (category: charm) — о сменном креплении (GuideModal)
  /** Строка под списком «Полезно знать» — текстом, не ссылкой. Ограничение одно на все изделия */
  'catalog.age_limit': {
    en: 'Contains small parts: for ages 6 and up',
    ru: 'Есть мелкие детали: для детей от&nbsp;6&nbsp;лет',
    vi: 'Có chi tiết nhỏ: dành cho trẻ từ 6 tuổi trở lên',
  },
  'catalog.charm_attachment.title': {
    en: 'Phone, keys or bag',
    ru: 'Крепление можно поменять',
    vi: 'Có thể đổi móc gắn',
  },
  'catalog.charm_attachment.text': {
    en: `
      <p>Along with my pieces, I leave a little box of spare parts in partner shops: rings with chains for keys, loops for phones and lobster clasps for bags. If the way the charm hangs in the photos doesn’t work for you, just tell the staff and they’ll swap it on the spot. When ordering online, mention in the chat how you’d like to wear it.</p>
      <p>Just keep the size of the charm in mind: a small one can get lost on a big bag, while a large one may get in the way on a phone or a bunch of keys. There’s a bottle cap in the photos for scale.</p>
    `,
    ru: `
      <p>Вместе с&nbsp;изделиями я&nbsp;оставляю в&nbsp;партнёрских магазинах коробочку с&nbsp;запчастями: кольца с&nbsp;цепочкой&nbsp;— для ключей, петельки&nbsp;— для телефона, карабины&nbsp;— для сумки. Если крепление на&nbsp;фото вам не&nbsp;подходит, скажите об&nbsp;этом в&nbsp;магазине, и&nbsp;его поменяют на&nbsp;месте. При заказе онлайн просто напишите в&nbsp;чате, какое крепление хотите.</p>
      <p>Только учитывайте размер брелока: маленький может потеряться на&nbsp;большой сумке, а&nbsp;крупный будет мешать на&nbsp;телефоне или связке ключей. Чтобы размер было проще представить, на&nbsp;фото рядом лежит крышечка от&nbsp;бутылки.</p>
    `,
    vi: `
      <p>Mỗi lần giao hàng, mình đều để lại ở cửa hàng đối tác một hộp phụ kiện nhỏ: khoen kèm dây xích để treo chìa khóa, dây đeo cho điện thoại và móc càng cua để treo lên túi xách. Nếu kiểu móc gắn trong ảnh chưa hợp với bạn, cứ nói với nhân viên, họ sẽ đổi ngay tại chỗ. Khi đặt hàng online, hãy nhắn trong chat nếu bạn muốn đổi móc gắn.</p>
      <p>Chỉ cần lưu ý kích thước sản phẩm: charm nhỏ dễ bị lọt thỏm trên túi lớn, còn charm to có thể vướng víu khi treo điện thoại hay chùm chìa khóa. Trong ảnh có đặt kèm một chiếc nắp chai để bạn dễ hình dung.</p>
    `,
  },
  // Модалка у брелоков: как изнашиваются и чего ждать. По карточке, которая вкладывается в заказ
  'catalog.charm_durability.title': {
    en: 'Durability & care',
    ru: 'Прочность и уход',
    vi: 'Độ bền và bảo quản',
  },
  'catalog.charm_durability.text': {
    en: `
      <p>I use seed beads of exceptional quality, but they are still glass, often with decorative finishes. Here’s what to expect:</p>
      <ul>
        <li><strong>As a keychain:</strong> expect wear from constant knocks. With a small set of keys it can last for years, but heavy bunches or a motorbike key greatly increase the risk of beads breaking.</li>
        <li><strong>As a phone charm:</strong> constant friction in pockets and bags is a harsh environment. Some finishes (mostly metallic) may wear off over time, and lighter colors may pick up dirt.</li>
        <li><strong>As a bag or backpack charm:</strong> long exposure to direct sunlight may make some colors fade.</li>
      </ul>
      <p>Despite all this, don’t be afraid to enjoy your charm! It was made to live an everyday life and wear its little scars. Some wear is inevitable — it’s part of its journey as your daily companion, and no reason not to use it with pleasure.</p>
      <p>Every piece is handmade, so small irregularities are to be expected.</p>
    `,
    ru: `
      <p>Я&nbsp;использую бисер исключительного качества, но&nbsp;это всё равно стекло, часто с&nbsp;декоративным покрытием. Вот чего стоит ожидать:</p>
      <ul>
        <li><strong>На&nbsp;ключах:</strong> брелок изнашивается от&nbsp;постоянных ударов. С&nbsp;небольшой связкой он&nbsp;прослужит годы, а&nbsp;с&nbsp;тяжёлой связкой или на&nbsp;ключе от&nbsp;мотобайка риск, что бисерины треснут, гораздо выше.</li>
        <li><strong>На&nbsp;телефоне:</strong> постоянное трение в&nbsp;кармане или сумке&nbsp;— суровые условия. Некоторые покрытия (в&nbsp;основном металлизированные) со&nbsp;временем могут стереться, а&nbsp;светлые цвета&nbsp;— загрязниться.</li>
        <li><strong>На&nbsp;сумке или рюкзаке:</strong> от&nbsp;долгого прямого солнца некоторые цвета могут выгореть.</li>
      </ul>
      <p>Несмотря на&nbsp;всё это, не&nbsp;бойтесь носить брелок! Он&nbsp;сделан, чтобы жить обычной жизнью и&nbsp;собирать следы ежедневного использования. Небольшой износ неизбежен&nbsp;— это часть его пути как вашего спутника на&nbsp;каждый день и&nbsp;не&nbsp;повод отказываться от&nbsp;удовольствия его носить.</p>
      <p>Каждое изделие сделано вручную, так что небольшие неровности возможны.</p>
    `,
    vi: `
      <p>Mình dùng hạt cườm chất lượng rất cao, nhưng đó vẫn là thủy tinh, thường có lớp phủ trang trí. Đây là những điều bạn nên biết:</p>
      <ul>
        <li><strong>Treo chìa khóa:</strong> charm sẽ bị mòn do va chạm liên tục. Với vài chiếc chìa nhỏ, charm có thể bền nhiều năm, nhưng nếu treo chùm chìa nặng hoặc chìa khóa xe máy thì nguy cơ hạt bị vỡ cao hơn nhiều.</li>
        <li><strong>Treo điện thoại:</strong> ma sát liên tục trong túi quần hay túi xách khá khắc nghiệt. Một số lớp phủ (chủ yếu là ánh kim) có thể bong dần, và màu sáng có thể bị bám bẩn theo thời gian.</li>
        <li><strong>Treo túi xách hoặc ba lô:</strong> phơi nắng trực tiếp lâu ngày có thể làm một số màu bị phai.</li>
      </ul>
      <p>Dù vậy, bạn đừng ngại dùng charm nhé! Nó được làm ra để theo bạn mỗi ngày và mang những dấu vết của cuộc sống thường ngày. Hao mòn một chút là điều khó tránh — đó cũng là một phần hành trình của người bạn đồng hành này, và không phải lý do để bạn bớt vui khi dùng nó.</p>
      <p>Mỗi sản phẩm đều làm thủ công nên có thể có vài điểm chưa đều.</p>
    `,
  },
  /** Ссылка в «Полезно знать» — на FAQ целиком: гарантия, доставка, оплата и остальное */
  'catalog.faq_link': {
    en: 'Warranty, shipping and more',
    ru: 'Гарантия, доставка и другие вопросы',
    vi: 'Bảo hành, giao hàng và các câu hỏi khác',
  },
  'catalog.credits': {
    en: 'Credits',
    ru: 'Credits',
    vi: 'Credits',
  },
  'catalog.crafted_by': {
    en: 'Crafted by',
    ru: 'Crafted by',
    vi: 'Crafted by',
  },
  'catalog.designed_by': {
    en: 'Designed by',
    ru: 'Designed by',
    vi: 'Designed by',
  },
  'catalog.photo_by': {
    en: 'Photo by',
    ru: 'Photo by',
    vi: 'Photo by',
  },
  'catalog.pcs': {
    en: 'pcs',
    ru: 'шт',
    vi: 'cái',
  },
  'catalog.remake_order': {
    en: 'Request a remake',
    ru: 'Заказать повтор',
    vi: 'Đặt làm lại (Remake)',
  },
  'catalog.offline_at': {
    en: 'In person at',
    ru: 'Очно в',
    vi: 'Trực tiếp tại',
  },
  'catalog.shop_word': {
    en: 'partner shop',
    ru: 'партнёрский магазин',
    vi: 'cửa hàng đối tác',
  },
  'catalog.offline_badge': {
    en: 'In person',
    ru: 'Очно',
    vi: 'Trực tiếp',
  },
  'catalog.pickup_badge': {
    en: 'Pickup',
    ru: 'Самовывоз',
    vi: 'Nhận tại chỗ',
  },
  'catalog.showcase_badge': {
    en: 'On display',
    ru: 'На\u00A0витрине',
    vi: 'Trưng bày',
  },
  'catalog.online_badge': {
    en: 'Online Store',
    ru: 'Онлайн',
    vi: 'Trực tuyến',
  },
  'catalog.free': {
    en: 'Free',
    ru: 'Бесплатно',
    vi: 'Miễn phí',
  },
  'catalog.delivery_badge': {
    en: 'Delivery',
    ru: 'Доставка',
    vi: 'Giao hàng',
  },
  'catalog.delivery_dalat_title': {
    en: 'Courier in Da Lat',
    ru: 'Курьер по\u00A0Далату',
    vi: 'Giao hàng hỏa tốc tại Đà Lạt',
  },
  'catalog.delivery_dalat_sub': {
    en: 'free, same-day delivery',
    ru: 'бесплатно, в\u00A0день заказа',
    vi: 'miễn phí, trong ngày',
  },
  'catalog.delivery_dalat_sub_today': {
    en: courier.en.today,
    ru: courier.ru.today,
    vi: courier.vi.today,
  },
  'catalog.delivery_dalat_sub_morning': {
    en: courier.en.morning,
    ru: courier.ru.morning,
    vi: courier.vi.morning,
  },
  'catalog.delivery_dalat_sub_tomorrow': {
    en: courier.en.tomorrow,
    ru: courier.ru.tomorrow,
    vi: courier.vi.tomorrow,
  },
  'catalog.delivery_dalat_sub_remake': {
    en: 'Upon completion',
    ru: 'В\u00A0день готовности',
    vi: 'Khi hoàn thành',
  },
  'catalog.pickup_dalat_sub_today': {
    en: pickup.en.today,
    ru: pickup.ru.today,
    vi: pickup.vi.today,
  },
  'catalog.pickup_dalat_sub_morning': {
    en: pickup.en.morning,
    ru: pickup.ru.morning,
    vi: pickup.vi.morning,
  },
  'catalog.pickup_dalat_sub_tomorrow': {
    en: pickup.en.tomorrow,
    ru: pickup.ru.tomorrow,
    vi: pickup.vi.tomorrow,
  },
  'catalog.pickup_dalat_sub_remake': {
    en: 'Upon completion',
    ru: 'В\u00A0день готовности',
    vi: 'Khi hoàn thành',
  },
  'catalog.shop_working_hours': {
    en: shopHours.en,
    ru: shopHours.ru,
    vi: shopHours.vi,
  },
  'catalog.delivery_payment_note': {
    en: payment.en.delivery,
    ru: payment.ru.delivery,
    vi: payment.vi.delivery,
  },
  'catalog.courier_payment_note': {
    en: payment.en.courier,
    ru: payment.ru.courier,
    vi: payment.vi.courier,
  },
  'catalog.pickup_payment_note': {
    en: payment.en.pickup,
    ru: payment.ru.pickup,
    vi: payment.vi.pickup,
  },
  'catalog.shop_payment_note': {
    en: payment.en.shop,
    ru: payment.ru.shop,
    vi: payment.vi.shop,
  },
  'catalog.pay_on_receipt': {
    en: paymentSuffix.en.receipt,
    ru: paymentSuffix.ru.receipt,
    vi: paymentSuffix.vi.receipt,
  },
  'catalog.pay_on_pickup': {
    en: paymentSuffix.en.pickup,
    ru: paymentSuffix.ru.pickup,
    vi: paymentSuffix.vi.pickup,
  },
  'catalog.pay_at_checkout': {
    en: paymentSuffix.en.checkout,
    ru: paymentSuffix.ru.checkout,
    vi: paymentSuffix.vi.checkout,
  },
  'catalog.delivery_vn_title': {
    en: 'Delivery across Vietnam',
    ru: 'Доставка по\u00A0Вьетнаму',
    vi: 'Giao hàng toàn Việt Nam',
  },
  'catalog.delivery_vn_sub': {
    en: 'free, 1‑3\u00A0days',
    ru: 'бесплатно, 1‑3\u00A0дня',
    vi: 'miễn phí, 1‑3\u00A0ngày',
  },
  'catalog.delivery_vn_sub_remake': {
    en: '1‑3\u00A0days once ready',
    ru: '1‑3\u00A0дня после\u00A0плетения',
    vi: '1‑3\u00A0ngày sau khi hoàn thành',
  },
  'catalog.sold_out': {
    en: 'Out of stock',
    ru: 'Нет в наличии',
    vi: 'Tạm hết hàng',
  },
  'catalog.out_of_stock': {
    en: 'Out of stock',
    ru: 'Нет в наличии',
    vi: 'Tạm hết hàng',
  },
  'catalog.availability_title': {
    en: 'Availability',
    ru: 'Наличие',
    vi: 'Còn hàng',
  },
  'catalog.filter.location_all': {
    en: 'Anywhere',
    ru: 'Везде',
    vi: 'Mọi nơi',
  },
  'catalog.empty': {
    en: 'Nothing matches these filters yet',
    ru: 'По этим фильтрам пока ничего нет',
    vi: 'Chưa có sản phẩm phù hợp với bộ lọc',
  },
  'catalog.craft_remake': {
    en: 'Happy to craft a remake',
    ru: 'С удовольствием сплету повтор',
    vi: 'Sẵn sàng làm lại theo yêu cầu',
  },
  'catalog.craft_time': {
    en: '2‑4\u00A0days',
    ru: '2‑4\u00A0дня',
    vi: '2‑4\u00A0ngày',
  },
  'catalog.showcase_title': {
    en: 'Showcases & Workshop',
    ru: 'Витрины и\u00A0мастерская',
    vi: 'Trưng bày & xưởng',
  },
  'catalog.delivery_hero_badge_ready': {
    en: 'Free\u00A0\u00A0·\u00A0\u00A0\u200B1‑3\u00A0days',
    ru: 'Бесплатно\u00A0\u00A0·\u00A0\u200B1‑3\u00A0дня',
    vi: 'Miễn phí\u00A0\u00A0·\u00A0\u00A0\u200B1‑3\u00A0ngày',
  },
  'catalog.delivery_hero_badge_remake': {
    en: 'Free\u00A0\u00A0·\u00A0\u00A0\u200B2‑4\u00A0days',
    ru: 'Бесплатно\u00A0\u00A0·\u00A0\u200BСрок 2‑4\u00A0дня',
    vi: 'Miễn phí\u00A0\u00A0·\u00A0\u00A0\u200B2‑4\u00A0ngày',
  },
  'catalog.delivery_from_dalat': {
    en: deliveryVnReady.en,
    ru: deliveryVnReady.ru,
    vi: deliveryVnReady.vi,
  },
  'catalog.delivery_from_dalat_remake': {
    en: deliveryVnRemake.en,
    ru: deliveryVnRemake.ru,
    vi: deliveryVnRemake.vi,
  },
  'catalog.remake_pill_label': {
    en: remakePill.en.label,
    ru: remakePill.ru.label,
    vi: remakePill.vi.label,
  },
  'catalog.remake_pill_suffix': {
    en: remakePill.en.suffix,
    ru: remakePill.ru.suffix,
    vi: remakePill.vi.suffix,
  },
  'catalog.ready_to_ship': {
    en: 'in stock',
    ru: 'в\u00A0наличии',
    vi: 'có sẵn',
  },
  'catalog.craft_remake_dalat': {
    en: 'Happy to craft a remake in Da Lat studio',
    ru: 'С удовольствием сплету повтор в студии в Далате',
    vi: 'Sẵn sàng làm lại theo yêu cầu tại studio Đà Lạt',
  },
  'catalog.courier_dalat_today': {
    en: 'Free same-day courier available within Da Lat',
    ru: 'По Далату доступен бесплатный курьер в\u00A0день заказа',
    vi: 'Giao hỏa tốc miễn phí tại Đà Lạt ngay trong ngày',
  },
  'catalog.courier_dalat_completion': {
    en: 'Free courier within Da Lat on completion day',
    ru: 'По Далату доступен бесплатный курьер в\u00A0день готовности',
    vi: 'Giao hỏa tốc miễn phí tại Đà Lạt ngay khi hoàn thành',
  },
  'catalog.expand': {
    en: 'Read more ↓',
    ru: 'Читать полностью ↓',
    vi: 'Xem thêm ↓',
  },
  'catalog.collapse': {
    en: 'Show less ↑',
    ru: 'Свернуть ↑',
    vi: 'Thu gọn ↑',
  },
  'catalog.last_checked': {
    en: 'Stock checked',
    ru: 'Проверено',
    vi: 'Đã kiểm tra',
  },
  'catalog.as_of': {
    en: 'in stock as of',
    ru: 'в наличии на',
    vi: 'tính đến',
  },
  'catalog.as_of_singular': {
    en: 'in stock as of',
    ru: 'в наличии на',
    vi: 'tính đến',
  },
  'catalog.in_stock_suffix': {
    en: 'in stock',
    ru: 'в\u00A0наличии',
    vi: 'có sẵn',
  },
  'catalog.weekly_audit_hint': {
    en: 'Weekly stock verification — click for details',
    ru: 'Еженедельный чекап наличия — нажмите, чтобы узнать подробнее',
    vi: 'Kiểm kê định kỳ mỗi tuần — bấm để xem chi tiết',
  },

  // Geo locations
  'geo.city.dalat': {
    en: 'Da Lat',
    ru: 'Далат',
    vi: 'Đà Lạt',
  },
  'geo.city.danang': {
    en: 'Da Nang',
    ru: 'Дананг',
    vi: 'Đà Nẵng',
  },
  'geo.city.hcm': {
    en: 'Ho Chi Minh',
    ru: 'Хошимин',
    vi: 'Hồ Chí Minh',
  },
  // Город в предложном падеже — для строки наличия: «1 шт в Далате»
  'geo.in.dalat': {
    en: 'in Da Lat',
    ru: 'в Далате',
    vi: 'ở Đà Lạt',
  },
  'geo.in.danang': {
    en: 'in Da Nang',
    ru: 'в Дананге',
    vi: 'ở Đà Nẵng',
  },
  'geo.in.hcm': {
    en: 'in Ho Chi Minh',
    ru: 'в Хошимине',
    vi: 'ở Hồ Chí Minh',
  },
  // Строка наличия на плашке семейства, когда в мастерской нет готового:
  // «1 шт в Дананге или повтор за 2–4 дня», а если нигде нет — «Повтор за 2–4 дня»
  'family.stock_remake': {
    en: 'remake in {days} days',
    ru: 'повтор за {days} дня',
    vi: 'nhận làm trong {days} ngày',
  },
  'family.stock_or': {
    en: 'or',
    ru: 'или',
    vi: 'hoặc',
  },
  'geo.district.lamvien': {
    en: 'Lam Vien',
    ru: 'Ламвьен',
    vi: 'Lâm Viên',
  },
  'geo.district.myan': {
    en: 'My An',
    ru: 'Ми Ан',
    vi: 'Mỹ An',
  },
  'geo.district.benthanh': {
    en: 'Ben Thanh',
    ru: 'Бен Тхань',
    vi: 'Bến Thành',
  },
  'geo.workshop_in': {
    en: 'Studio in',
    ru: 'Мастерская в',
    vi: 'Xưởng tại',
  },
  'geo.pickup_at_workshop': {
    en: 'Pickup from studio in',
    ru: 'Самовывоз из\u00A0мастерской в',
    vi: 'Nhận tại studio ở',
  },
  'geo.pickup_at_workshop_suffix': {
    en: 'pickup from studio',
    ru: 'самовывоз из\u00A0мастерской',
    vi: 'nhận tại studio',
  },
  'catalog.studio_card_title': {
    en: 'Studio in\u00A0Da\u00A0Lat',
    ru: 'Мастерская в\u00A0Далате',
    vi: 'Xưởng tại\u00A0Đà\u00A0Lạt',
  },
  'catalog.studio_remake_label': {
    en: 'None ready',
    ru: 'Нет готового',
    vi: 'Chưa có sẵn',
  },
  'catalog.pickup_studio_title': {
    en: 'Self-pickup\u00A0— Da\u00A0Lat, Lam\u00A0Vien',
    ru: 'Самовывоз\u00A0— Далат, Ламвьен',
    vi: 'Nhận trực tiếp\u00A0— Đà\u00A0Lạt, Lâm\u00A0Viên',
  },
  'catalog.pay_in_store_checkout': {
    en: 'at\u00A0checkout',
    ru: 'на\u00A0кассе',
    vi: 'tại\u00A0quầy',
  },
  'catalog.on_showcase_at': {
    en: 'on display at',
    ru: 'на\u00A0витрине в',
    vi: 'trưng bày tại',
  },
  'geo.workshop.dalat': {
    en: 'Studio in Da Lat, Lam Vien',
    ru: 'Мастерская в Далат, Ламвьен',
    vi: 'Xưởng tại Đà Lạt, Lâm Viên',
  },
  'catalog.modal.title': {
    en: 'Availability at {shop}',
    ru: 'Наличие в\u00A0{shop}',
    vi: 'Tình trạng hàng tại {shop}',
  },
  'catalog.modal.nm_content': {
    en: `
      <p><span class="nobr"><strong>NGÀY&nbsp;MAI</strong></span> is an authentic handmade shop in <span class="nobr">Da&nbsp;Nang</span> with actual shelves you can explore in person. Among indie perfumes, minerals, ceramics, and woodwork, you’ll find my corner as well. We sync up once a week to check what’s left in stock, and that's when I update the website. And this is what the “last checked” date refers to.</p>
      <p>Beadwork moves at a rather calm pace, so for the first couple of days after an update, <strong>{item}</strong> is almost certainly waiting for you on the shelf. No\u00A0100% guarantee, of course, but <span class="nobr">NGÀY&nbsp;MAI</span> itself is well worth stopping by regardless!</p>
    `,
    ru: `
      <p><span class="nobr"><strong>NGÀY&nbsp;MAI</strong></span>&nbsp;— это магазин аутентичного хендмейда с&nbsp;живой витриной в&nbsp;Дананге. Среди авторских духов, минералов, керамики и&nbsp;дерева расположился и&nbsp;мой уголок. Раз в&nbsp;неделю мы сверяем наличие на&nbsp;стенде, и&nbsp;я&nbsp;обновляю сайт&nbsp;— это и&nbsp;есть дата проверки.</p>
      <p>Хендмейд продаётся неторопливо, так что в&nbsp;первые дни после проверки <strong>{item}</strong> практически гарантированно на&nbsp;месте и&nbsp;ждёт вас. Без стопроцентной гарантии, конечно, но&nbsp;в&nbsp;любом случае <span class="nobr">NGÀY&nbsp;MAI</span>&nbsp;— это само по&nbsp;себе прекрасное место, куда обязательно стоит заглянуть!</p>
    `,
    vi: `
      <p><span class="nobr"><strong>NGÀY&nbsp;MAI</strong></span> là một tiệm đồ thủ công rất xinh yêu ở <span class="nobr">Đà&nbsp;Nẵng</span>, nơi bạn có thể ghé tận nơi để sờ tận tay, ngắm tận mắt từng món trên kệ. Bên cạnh nước hoa indie, đá thiên nhiên, đồ gốm và đồ gỗ, bạn cũng sẽ thấy một góc nhỏ của tụi mình ở&nbsp;đó.</p>
      <p>Tụi mình kiểm lại đồ trên kệ mỗi tuần một lần rồi mình mới cập nhật lên web&nbsp;— số lượng và ngày “kiểm tra” bạn thấy chính là từ lần đếm gần nhất&nbsp;đó.</p>
      <p>Đồ cườm bán ra cũng túc tắc thôi, nên tầm vài ngày đầu sau khi cập nhật thì <strong>{item}</strong> gần như chắc chắn vẫn còn trên kệ đợi bạn. Dù không dám hứa\u00A0100%, nhưng ghé <span class="nobr">NGÀY&nbsp;MAI</span> dạo chơi một vòng cũng rất thú vị&nbsp;nha!</p>
    `,
  },
  'catalog.modal.stock_photo_title': {
    en: 'Display photo ·',
    ru: 'Фото витрины ·',
    vi: 'Ảnh góc trưng bày ·',
  },
  'catalog.modal.photo_zoom_hint': {
    en: 'Click to open full size photo',
    ru: 'Нажмите, чтобы открыть фото в полном размере',
    vi: 'Nhấp để xem ảnh kích thước đầy đủ',
  },
  'catalog.modal.photo_zoom_badge': {
    en: 'Zoom in',
    ru: 'Увеличить',
    vi: 'Phóng to',
  },
  'catalog.modal.nm_hours': {
    en: shopModalHours.en,
    ru: shopModalHours.ru,
    vi: shopModalHours.vi,
  },
  'catalog.modal.nm_payment': {
    en: shopPayment.en,
    ru: shopPayment.ru,
    vi: shopPayment.vi,
  },
  'catalog.modal.nm_maps': {
    en: 'NGÀY\u00A0MAI on Google Maps',
    ru: 'NGÀY\u00A0MAI на\u00A0Google\u00A0Картах',
    vi: 'NGÀY\u00A0MAI trên Google Maps',
  },
  'catalog.modal.catfood_content': {
    en: `
      <p><span class="nobr"><strong>Cat&nbsp;Food</strong></span> is a cozy concept store in <span class="nobr">Ho&nbsp;Chi&nbsp;Minh City</span> featuring my humble display of handmade beadwork.</p>
      <p>Once a week, we conduct a mutual stock checkup and update availability.</p>
    `,
    ru: `
      <p><span class="nobr"><strong>Cat&nbsp;Food</strong></span>&nbsp;— очень уютный концепт-стор в&nbsp;Хошимине, где среди других авторских вещей живёт и&nbsp;моя скромная витрина.</p>
      <p>Раз в&nbsp;неделю мы бережно сверяем часы и&nbsp;обновляем данные о&nbsp;наличии.</p>
    `,
    vi: `
      <p><span class="nobr"><strong>Cat&nbsp;Food</strong></span> là concept store xinh xắn tại <span class="nobr">TP.&nbsp;Hồ&nbsp;Chí&nbsp;Minh</span> có góc trưng bày các sản phẩm thủ công của chúng mình.</p>
      <p>Mỗi tuần chúng mình đều đối soát kiểm kê để cập nhật tình trạng có sẵn.</p>
    `,
  },
  'catalog.modal.catfood_maps': {
    en: 'Cat\u00A0Food on Google Maps',
    ru: 'Cat\u00A0Food на\u00A0Google\u00A0Картах',
    vi: 'Cat\u00A0Food trên Google Maps',
  },
  'catalog.modal.close': {
    en: 'Got it',
    ru: 'Понятно 💖',
    vi: 'Đã hiểu',
  },
  'catalog.remake_hint': {
    en: 'Piece remake — click to learn more',
    ru: 'Повтор изделия — нажмите, чтобы узнать подробнее',
    vi: 'Đặt làm lại mẫu — bấm để xem chi tiết',
  },
  'catalog.modal.remake_title': {
    en: 'How made-to-order remakes work',
    ru: 'Как работает повтор изделия',
    vi: 'Đặt làm lại một mẫu diễn ra thế nào?',
  },
  'catalog.modal.remake_content': {
    en: `
      <p>A remake is actually simpler than it sounds: the measurements are already done, the beads are chosen, the pattern is ready for weaving, and the design\u00A0— if it’s a paid one\u00A0— has already been purchased. All that’s left is my favorite part: the beading. And I’m good at it!</p>
      <p>But first, let's make sure I have the seed beads and findings on hand. That said, I do my best to keep everything well-stocked\u00A0— because, you know, the spice must flow ✧\u00A0— and I've never had to turn down a remake yet. Contact me to sort out the details:</p>
    `,
    ru: `
      <p>Повтор изделия&nbsp;— это проще, чем кажется: замеры уже сделаны, бисер подобран, схема подготовлена к&nbsp;плетению, а&nbsp;дизайн, если он платный, куплен. Остаётся только моя любимая часть&nbsp;— само плетение. И&nbsp;я&nbsp;в&nbsp;этом хороша!</p>
      <p>Но нам нужно уточнить наличие нужного бисера и&nbsp;фурнитуры. Впрочем, я&nbsp;стараюсь держать запасы наполненными (ведь the spice must flow ✧) и&nbsp;пока ни&nbsp;разу не&nbsp;приходилось отказывать в&nbsp;повторе. Напишите мне, чтобы сверить детали:</p>
    `,
    vi: `
      <p>Đan lại một món đồ thật ra đơn giản hơn bạn nghĩ nhiều: số đo đã có sẵn, hạt cườm đã chọn xong, sơ đồ đan đã lên khung, và bản quyền thiết kế (nếu là mẫu trả phí) cũng đã mua rồi. Mình chỉ việc bắt tay vào phần yêu thích nhất: ngồi đan hạt thôi. Mà đan cườm thì đúng là sở trường của mình rồi!</p>
      <p>Tuy vậy, trước tiên tụi mình cần kiểm tra lại xem trong xưởng còn sẵn hạt cườm và phụ kiện cho mẫu này không nhé. Thật ra mình luôn cố gắng giữ kho nguyên liệu thật đầy\u00A0— vì, bạn biết đấy, the spice must flow ✧\u00A0— và từ trước tới nay mình chưa từng phải từ chối làm lại mẫu nào cả. Nhắn cho mình để cùng chốt lại chi tiết nha:</p>
    `,
  },
  'catalog.modal.remake_tg_button': {
    en: 'Order',
    ru: 'Заказать',
    vi: 'Đặt làm',
  },
  'catalog.modal.remake_note': {
    en: 'Kindly note: this isn’t a custom order, but a remake along a path I’ve already walked. We can, of course, swap out the clasp or adjust the length, but changing the color palette or reworking the design would be a more involved project.',
    ru: 'Обратите внимание: это не&nbsp;индивидуальный заказ, а&nbsp;повтор по&nbsp;уже протоптанной тропинке. Мы, конечно, можем заменить замочек или скорректировать длину, но&nbsp;смена палитры или доработка дизайна&nbsp;— это, пожалуй, отдельная услуга.',
    vi: 'Bạn lưu ý một chút nha: đây là mẫu được làm, chứ không phải đơn đặt làm riêng (custom). Tụi mình hoàn toàn có thể đổi loại móc khóa hoặc chỉnh lại độ dài, nhưng nếu muốn đổi bảng màu hay biến tấu lại thiết kế thì sẽ tốn nhiều công sức hơn hẳn và tính như một đơn đặt riêng nhé.',
  },

  // Blog UI
  'blog.title': {
    en: 'Beadwork Journal & Stories',
    ru: 'Блог & Заметки мастера',
    vi: 'Nhật Ký Đan Cườm & Câu Chuyện',
  },
  'blog.subtitle': {
    en: 'Jewelry care guides, craftsmanship secrets, and creative thoughts from Anna',
    ru: 'Секреты мастерства, уход за бисером и творческий процесс создания красоты',
    vi: 'Bí quyết bảo quản trang sức, kỹ thuật đan cườm và tâm sự của nghệ nhân Anna',
  },
  'blog.read_more': {
    en: 'Read Article',
    ru: 'Читать статью',
    vi: 'Đọc bài viết',
  },
  'blog.published_on': {
    en: 'Published on',
    ru: 'Опубликовано',
    vi: 'Ngày đăng',
  },
  'blog.back_to_blog': {
    en: 'Back to Journal',
    ru: 'Назад в блог',
    vi: 'Quay lại bài viết',
  },

  // Delivery Page
  'delivery.title': {
    en: 'Shipping & Payment',
    ru: 'Доставка и оплата',
    vi: 'Vận Chuyển & Thanh Toán',
  },
  'delivery.subtitle': {
    en: 'Worldwide insured delivery, protective packaging, and bespoke care',
    ru: 'Бережная доставка по всему миру, подарочная упаковка и гарантия качества',
    vi: 'Giao hàng toàn cầu an toàn, đóng gói hộp quà sang trọng và tận tâm',
  },

  // FAQ Page
  'faq.title': {
    en: 'Frequently Asked Questions',
    ru: 'Частые вопросы',
    vi: 'Câu hỏi thường gặp',
  },
  'faq.subtitle': {
    en: 'Everything you wanted to know about custom orders, materials, payment, shipping, and our honest craft philosophy',
    ru: 'Всё, что вы хотели знать об индивидуальных заказах, материалах, оплате, доставке и честном подходе к делу',
    vi: 'Mọi điều bạn cần biết về đặt làm riêng, chất liệu, thanh toán, giao hàng và triết lý thủ công chân thật',
  },
  'faq.seo_title': {
    en: 'FAQ — Frequently Asked Questions | bunnybearbeads',
    ru: 'Частые вопросы (FAQ) — bunnybearbeads',
    vi: 'Câu Hỏi Thường Gặp (FAQ) — bunnybearbeads',
  },
  'faq.seo_desc': {
    en: 'Answers to common questions about custom orders, beads & materials, hardware, payment, and shipping at bunnybearbeads.',
    ru: 'Ответы на частые вопросы об индивидуальных заказах, материалах, фурнитуре, оплате и доставке в bunnybearbeads.',
    vi: 'Giải đáp thắc mắc về đặt làm theo yêu cầu, mua hạt cườm, thanh toán tài khoản ngân hàng Việt Nam và vận chuyển tại bunnybearbeads.',
  },
  'faq.cta_heading': {
    en: 'Still have questions or an idea?',
    ru: 'Остались вопросы или есть идея?',
    vi: 'Bạn còn câu hỏi hoặc có ý tưởng mới?',
  },
  'faq.cta_text': {
    en: 'Message me directly — always happy to chat about beads, findings, or a new design idea!',
    ru: 'Напишите мне напрямую — с радостью пообщаемся, обсудим бисер, фурнитуру или новый дизайн!',
    vi: 'Hãy nhắn tin trực tiếp cho mình nhé — mình luôn sẵn sàng trò chuyện về hạt cườm, phụ kiện hay mẫu thiết kế mới!',
  },
  'faq.cta_contact': {
    en: 'Get in Touch',
    ru: 'Написать мастеру',
    vi: 'Liên hệ với mình',
  },
  'faq.cta_catalog': {
    en: 'Explore Catalog',
    ru: 'В каталог',
    vi: 'Xem danh mục',
  },

  // Blog Article CTA
  'blog.explore_catalog': {
    en: 'Explore Jewelry Catalog',
    ru: 'Смотреть каталог изделий',
    vi: 'Xem các mẫu trang sức',
  },

  // Gallery
  'gallery.thumbs_prev': {
    en: 'Previous thumbnails',
    ru: 'Предыдущие миниатюры',
    vi: 'Hình thu nhỏ trước',
  },
  'gallery.thumbs_next': {
    en: 'Next thumbnails',
    ru: 'Следующие миниатюры',
    vi: 'Hình thu nhỏ tiếp theo',
  },
  'gallery.thumbs_ribbon': {
    en: 'Product thumbnails',
    ru: 'Миниатюры товара',
    vi: 'Hình thu nhỏ sản phẩm',
  },
  'gallery.main_prev': {
    en: 'Previous photo',
    ru: 'Предыдущее фото',
    vi: 'Ảnh trước',
  },
  'gallery.main_next': {
    en: 'Next photo',
    ru: 'Следующее фото',
    vi: 'Ảnh tiếp theo',
  },
  'gallery.photo': {
    en: 'photo',
    ru: 'фото',
    vi: 'ảnh',
  },
  'gallery.video': {
    en: 'video',
    ru: 'видео',
    vi: 'video',
  },
  'gallery.preview': {
    en: 'preview',
    ru: 'превью',
    vi: 'bản xem trước',
  },
  'gallery.close': {
    en: 'Close fullscreen gallery',
    ru: 'Закрыть галерею',
    vi: 'Đóng bộ sưu tập',
  },
  'gallery.fullscreen': {
    en: 'Fullscreen',
    ru: 'Во весь экран',
    vi: 'Toàn màn hình',
  },
  'gallery.play': {
    en: 'Play video',
    ru: 'Воспроизвести видео',
    vi: 'Phát video',
  },
  'gallery.pause': {
    en: 'Pause video',
    ru: 'Приостановить видео',
    vi: 'Tạm dừng video',
  },

  // Footer
  'footer.copyright': {
    en: '© 2026 bunnybearbeads — Artisan Beadwork Studio. Crafted with love 💖',
    ru: '© 2026 bunnybearbeads — Мастерская авторского бисероплетения. Сделано с любовью 💖',
    vi: '© 2026 bunnybearbeads — Xưởng thủ công cườm nghệ thuật. Làm bằng cả trái tim 💖',
  },

} as const;

export type TranslationKey = keyof typeof translations;

type UIMap = {
  [L in SupportedLanguage]: {
    [K in TranslationKey]: string;
  };
};

export const ui: UIMap = {
  en: {} as { [K in TranslationKey]: string },
  ru: {} as { [K in TranslationKey]: string },
  vi: {} as { [K in TranslationKey]: string },
};

for (const key of Object.keys(translations) as TranslationKey[]) {
  ui.en[key] = translations[key].en;
  ui.ru[key] = translations[key].ru;
  ui.vi[key] = translations[key].vi;
}

