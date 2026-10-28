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

const courierEN = getCourierScheduleText('en');
const pickupEN = getPickupScheduleText('en');
const shopHoursEN = getPartnerShopHoursText('en');
const shopModalHoursEN = getPartnerShopModalHoursText('en');
const shopPaymentEN = getPartnerShopPaymentDetailsText('en');
const paymentEN = getPaymentNotesText('en');
const paymentSuffixEN = getPaymentSuffixText('en');
const deliveryVnReadyEN = getDeliveryVietnamSubnote('en', false);
const deliveryVnRemakeEN = getDeliveryVietnamSubnote('en', true);
const remakePillEN = getRemakeStockPillText('en');

const courierRU = getCourierScheduleText('ru');
const pickupRU = getPickupScheduleText('ru');
const shopHoursRU = getPartnerShopHoursText('ru');
const shopModalHoursRU = getPartnerShopModalHoursText('ru');
const shopPaymentRU = getPartnerShopPaymentDetailsText('ru');
const paymentRU = getPaymentNotesText('ru');
const paymentSuffixRU = getPaymentSuffixText('ru');
const deliveryVnReadyRU = getDeliveryVietnamSubnote('ru', false);
const deliveryVnRemakeRU = getDeliveryVietnamSubnote('ru', true);
const remakePillRU = getRemakeStockPillText('ru');

const courierVI = getCourierScheduleText('vi');
const pickupVI = getPickupScheduleText('vi');
const shopHoursVI = getPartnerShopHoursText('vi');
const shopModalHoursVI = getPartnerShopModalHoursText('vi');
const shopPaymentVI = getPartnerShopPaymentDetailsText('vi');
const paymentVI = getPaymentNotesText('vi');
const paymentSuffixVI = getPaymentSuffixText('vi');
const deliveryVnReadyVI = getDeliveryVietnamSubnote('vi', false);
const deliveryVnRemakeVI = getDeliveryVietnamSubnote('vi', true);
const remakePillVI = getRemakeStockPillText('vi');

export const ui = {
  en: {
    // Top Bar Links
    'nav.order': 'Custom Order',
    'nav.about': 'About Us',
    'nav.contacts': 'Contacts & Socials',
    'nav.where_to_buy': 'Where to Buy',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ — Must Read!',
    'nav.delivery': 'Delivery',
    'nav.language': 'Language',

    // Main Categories (Lower Header & Catalog Filters)
    'cat.all': 'All',
    'cat.bracelets': 'Bracelets',
    'cat.rings': 'Rings',
    'cat.phone_charms': 'Phone Charms',
    'cat.keychains': 'Keychains',
    'cat.other': 'Other',
    'search.label': 'Search',
    'search.placeholder': 'Search jewelry, phone charms, rings...',

    // Site meta
    'site.title': 'BunnyBearBeads — Handcrafted Beadwork & Artisan Jewelry',
    'site.description': 'Unique handmade beadwork jewelry, custom phone charms, rings, and accessories.',

    // Catalog UI
    'catalog.title': 'Finished Jewelry & Charms',
    'catalog.subtitle': 'Artisan handcrafted beaded jewelry, delicate charms, and bespoke accessories',
    'catalog.in_stock': 'In Stock',
    'catalog.order_piece': 'Order / Inquire',
    'catalog.view_details': 'View Details',
    'catalog.price_label': 'Price',
    'catalog.materials_label': 'Materials & Specs',
    'catalog.breadcrumb': 'Catalog',
    'catalog.back_to_catalog': 'Back to Catalog',
    'catalog.where_to_buy': 'Delivery',
    'catalog.credits': 'Credits',
    'catalog.crafted_by': 'Crafted by',
    'catalog.designed_by': 'Designed by',
    'catalog.pcs': 'pcs',
    'catalog.remake_order': 'Request a remake',
    'catalog.offline_at': 'In person at',
    'catalog.shop_word': 'partner shop',
    'catalog.offline_badge': 'In person',
    'catalog.pickup_badge': 'Pickup',
    'catalog.showcase_badge': 'On display',
    'catalog.online_badge': 'Online Store',
    'catalog.free': 'Free',
    'catalog.delivery_badge': 'Delivery',
    'catalog.delivery_dalat_title': 'Courier in Da Lat',
    'catalog.delivery_dalat_sub': 'free, same-day delivery',
    'catalog.delivery_dalat_sub_today': courierEN.today,
    'catalog.delivery_dalat_sub_morning': courierEN.morning,
    'catalog.delivery_dalat_sub_tomorrow': courierEN.tomorrow,
    'catalog.delivery_dalat_sub_remake': 'Upon completion',
    'catalog.pickup_dalat_sub_today': pickupEN.today,
    'catalog.pickup_dalat_sub_morning': pickupEN.morning,
    'catalog.pickup_dalat_sub_tomorrow': pickupEN.tomorrow,
    'catalog.pickup_dalat_sub_remake': 'Upon completion',
    'catalog.shop_working_hours': shopHoursEN,
    'catalog.delivery_payment_note': paymentEN.delivery,
    'catalog.courier_payment_note': paymentEN.courier,
    'catalog.pickup_payment_note': paymentEN.pickup,
    'catalog.shop_payment_note': paymentEN.shop,
    'catalog.pay_on_receipt': paymentSuffixEN.receipt,
    'catalog.pay_on_pickup': paymentSuffixEN.pickup,
    'catalog.pay_at_checkout': paymentSuffixEN.checkout,
    'catalog.delivery_vn_title': 'Delivery across Vietnam',
    'catalog.delivery_vn_sub': 'free, 1‑3\u00A0days',
    'catalog.delivery_vn_sub_remake': '1‑3\u00A0days once ready',
    'catalog.sold_out': 'Out of stock',
    'catalog.out_of_stock': 'Out of stock',
    'catalog.craft_remake': 'Happy to craft a remake',
    'catalog.craft_time': '2‑4\u00A0days',
    'catalog.showcase_title': 'Showcases & Workshop',
    'catalog.delivery_hero_badge_ready': 'Free\u00A0\u00A0·\u00A0\u00A0\u200B1‑3\u00A0days',
    'catalog.delivery_hero_badge_remake': 'Free\u00A0\u00A0·\u00A0\u00A0\u200B2‑4\u00A0days',
    'catalog.delivery_from_dalat': deliveryVnReadyEN,
    'catalog.delivery_from_dalat_remake': deliveryVnRemakeEN,
    'catalog.remake_pill_label': remakePillEN.label,
    'catalog.remake_pill_suffix': remakePillEN.suffix,
    'catalog.ready_to_ship': 'in stock',
    'catalog.craft_remake_dalat': 'Happy to craft a remake in Da Lat studio',
    'catalog.courier_dalat_today': 'Free same-day courier available within Da Lat',
    'catalog.courier_dalat_completion': 'Free courier within Da Lat on completion day',
    'catalog.crafter_note_title': 'Made to Order',
    'catalog.expand': 'Read more ↓',
    'catalog.collapse': 'Show less ↑',
    'catalog.last_checked': 'Stock checked',
    'catalog.as_of': 'in stock as of',
    'catalog.in_stock_suffix': 'in stock',
    'catalog.weekly_audit_hint': 'Weekly stock verification — click for details',

    // Geo locations
    'geo.city.dalat': 'Da Lat',
    'geo.city.danang': 'Da Nang',
    'geo.city.hcm': 'Ho Chi Minh',
    'geo.district.lamvien': 'Lam Vien',
    'geo.district.myan': 'My An',
    'geo.district.benthanh': 'Ben Thanh',
    'geo.workshop_in': 'Studio in',
    'geo.pickup_at_workshop': 'Pickup from studio in',
    'geo.pickup_at_workshop_suffix': 'pickup from studio',
    'catalog.on_showcase_at': 'on display at',
    'geo.workshop.dalat': 'Studio in Da Lat, Lam Vien',
    'catalog.modal.title': 'About the “last checked” date',
    'catalog.modal.nm_content': `
      <p><span class="nobr"><strong>NGÀY&nbsp;MAI</strong></span> is an authentic handmade shop in <span class="nobr">Da&nbsp;Nang</span> with actual shelves you can explore in person. Among indie perfumes, minerals, ceramics, and handcrafted leather accessories, you’ll find my corner as well. We sync up once a week to check what’s left in stock, and that's when I update the website. And this is what the “last checked” date refers to.</p>
      <p>Beadwork moves at a rather calm pace, so for the first couple of days after an update, <strong>{item}</strong> is almost certainly waiting for you on the shelf. No\u00A0100% guarantee, of course, but <span class="nobr">NGÀY&nbsp;MAI</span> itself is well worth stopping by regardless!</p>
    `,
    'catalog.modal.stock_photo_title': 'Display photo ·',
    'catalog.modal.photo_zoom_hint': 'Click to open full size photo',
    'catalog.modal.photo_zoom_badge': 'Zoom in',
    'catalog.modal.nm_hours': shopModalHoursEN,
    'catalog.modal.nm_payment': shopPaymentEN,
    'catalog.modal.nm_maps': 'NGÀY\u00A0MAI on Google Maps',
    'catalog.modal.catfood_content': `
      <p><span class="nobr"><strong>Cat&nbsp;Food</strong></span> is a cozy concept store in <span class="nobr">Ho&nbsp;Chi&nbsp;Minh City</span> featuring my humble display of handmade beadwork.</p>
      <p>Once a week, we conduct a mutual stock checkup and update availability.</p>
      <p class="checkup__highlight">If you are visiting <span class="nobr">Ben&nbsp;Thanh</span> in Saigon, feel free to stop by and check out the pieces in person!</p>
    `,
    'catalog.modal.catfood_maps': 'Cat\u00A0Food on Google Maps',
    'catalog.modal.close': 'Got it',

    // Blog UI
    'blog.title': 'Beadwork Journal & Stories',
    'blog.subtitle': 'Jewelry care guides, craftsmanship secrets, and creative thoughts from Anna',
    'blog.read_more': 'Read Article',
    'blog.published_on': 'Published on',
    'blog.back_to_blog': 'Back to Journal',

    // Delivery Page
    'delivery.title': 'Shipping & Payment',
    'delivery.subtitle': 'Worldwide insured delivery, protective packaging, and bespoke care',

    // FAQ Page
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you wanted to know about custom orders, materials, payment, shipping, and our honest craft philosophy',
    'faq.seo_title': 'FAQ — Frequently Asked Questions | BunnyBearBeads',
    'faq.seo_desc': 'Answers to common questions about custom orders, beads & materials, hardware, payment, and shipping at BunnyBearBeads.',
    'faq.cta_heading': 'Still have questions or an idea?',
    'faq.cta_text': 'Message me directly — always happy to chat about beads, findings, or a new design idea!',
    'faq.cta_contact': 'Get in Touch',
    'faq.cta_catalog': 'Explore Catalog',

    // Blog Article CTA
    'blog.explore_catalog': 'Explore Jewelry Catalog',

    // Gallery
    'gallery.thumbs_prev': 'Previous thumbnails',
    'gallery.thumbs_next': 'Next thumbnails',
    'gallery.thumbs_ribbon': 'Product thumbnails',
    'gallery.main_prev': 'Previous photo',
    'gallery.main_next': 'Next photo',
    'gallery.photo': 'photo',
    'gallery.video': 'video',
    'gallery.preview': 'preview',
    'gallery.close': 'Close fullscreen gallery',
    'gallery.fullscreen': 'Fullscreen',
    'gallery.play': 'Play video',
    'gallery.pause': 'Pause video',

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Artisan Beadwork Studio. Crafted with love 💖',
  },
  ru: {
    // Top Bar Links
    'nav.order': 'Заказать украшение',
    'nav.about': 'О нас',
    'nav.contacts': 'Контакты и соц.сети',
    'nav.where_to_buy': 'Где купить',
    'nav.blog': 'Блог',
    'nav.faq': 'FAQ — это важно!',
    'nav.delivery': 'Доставка',
    'nav.language': 'Язык',

    // Main Categories (Lower Header & Catalog Filters)
    'cat.all': 'Всё',
    'cat.bracelets': 'Браслеты',
    'cat.rings': 'Кольца',
    'cat.phone_charms': 'Фончармы (на телефон)',
    'cat.keychains': 'Брелоки на ключи',
    'cat.other': 'Разное',
    'search.label': 'Поиск',
    'search.placeholder': 'Поиск украшений, фончармов, колец...',

    // Site meta
    'site.title': 'BunnyBearBeads — Авторские украшения из бисера & Аксессуары',
    'site.description': 'Уникальные авторские украшения из бисера, стильные фончармы на телефон, кольца и браслеты.',

    // Catalog UI
    'catalog.title': 'Каталог украшений & аксессуаров',
    'catalog.subtitle': 'Авторские украшения ручной работы из бисера, трендовые фончармы и уникальные изделия',
    'catalog.in_stock': 'В наличии',
    'catalog.order_piece': 'Заказать',
    'catalog.view_details': 'Подробнее',
    'catalog.price_label': 'Стоимость',
    'catalog.materials_label': 'Характеристики и материалы',
    'catalog.breadcrumb': 'Каталог',
    'catalog.back_to_catalog': 'Назад в каталог',
    'catalog.where_to_buy': 'Доставка',
    'catalog.credits': 'Credits',
    'catalog.crafted_by': 'Crafted by',
    'catalog.designed_by': 'Designed by',
    'catalog.pcs': 'шт',
    'catalog.remake_order': 'Заказать к ремейку',
    'catalog.offline_at': 'Очно в',
    'catalog.shop_word': 'партнёрский магазин',
    'catalog.offline_badge': 'Очно',
    'catalog.pickup_badge': 'Самовывоз',
    'catalog.showcase_badge': 'На\u00A0витрине',
    'catalog.online_badge': 'Онлайн',
    'catalog.free': 'Бесплатно',
    'catalog.delivery_badge': 'Доставка',
    'catalog.delivery_dalat_title': 'Курьер по\u00A0Далату',
    'catalog.delivery_dalat_sub': 'бесплатно, в\u00A0день заказа',
    'catalog.delivery_dalat_sub_today': courierRU.today,
    'catalog.delivery_dalat_sub_morning': courierRU.morning,
    'catalog.delivery_dalat_sub_tomorrow': courierRU.tomorrow,
    'catalog.delivery_dalat_sub_remake': 'В\u00A0день готовности',
    'catalog.pickup_dalat_sub_today': pickupRU.today,
    'catalog.pickup_dalat_sub_morning': pickupRU.morning,
    'catalog.pickup_dalat_sub_tomorrow': pickupRU.tomorrow,
    'catalog.pickup_dalat_sub_remake': 'В\u00A0день готовности',
    'catalog.shop_working_hours': shopHoursRU,
    'catalog.delivery_payment_note': paymentRU.delivery,
    'catalog.courier_payment_note': paymentRU.courier,
    'catalog.pickup_payment_note': paymentRU.pickup,
    'catalog.shop_payment_note': paymentRU.shop,
    'catalog.pay_on_receipt': paymentSuffixRU.receipt,
    'catalog.pay_on_pickup': paymentSuffixRU.pickup,
    'catalog.pay_at_checkout': paymentSuffixRU.checkout,
    'catalog.delivery_vn_title': 'Доставка по\u00A0Вьетнаму',
    'catalog.delivery_vn_sub': 'бесплатно, 1‑3\u00A0дня',
    'catalog.delivery_vn_sub_remake': '1‑3\u00A0дня после\u00A0плетения',
    'catalog.sold_out': 'Нет в наличии',
    'catalog.out_of_stock': 'Нет в наличии',
    'catalog.craft_remake': 'С удовольствием сплету повтор',
    'catalog.craft_time': '2‑4\u00A0дня',
    'catalog.showcase_title': 'Витрины и\u00A0мастерская',
    'catalog.delivery_hero_badge_ready': 'Бесплатно\u00A0\u00A0·\u00A0\u200B1‑3\u00A0дня',
    'catalog.delivery_hero_badge_remake': 'Бесплатно\u00A0\u00A0·\u00A0\u200BСрок 2‑4\u00A0дня',
    'catalog.delivery_from_dalat': deliveryVnReadyRU,
    'catalog.delivery_from_dalat_remake': deliveryVnRemakeRU,
    'catalog.remake_pill_label': remakePillRU.label,
    'catalog.remake_pill_suffix': remakePillRU.suffix,
    'catalog.ready_to_ship': 'в\u00A0наличии',
    'catalog.craft_remake_dalat': 'С удовольствием сплету повтор в студии в Далате',
    'catalog.courier_dalat_today': 'По Далату доступен бесплатный курьер в\u00A0день заказа',
    'catalog.courier_dalat_completion': 'По Далату доступен бесплатный курьер в\u00A0день готовности',
    'catalog.crafter_note_title': 'Изготовление под заказ',
    'catalog.expand': 'Читать полностью ↓',
    'catalog.collapse': 'Свернуть ↑',
    'catalog.last_checked': 'Проверено',
    'catalog.as_of': 'в наличии на',
    'catalog.as_of_singular': 'в наличии на',
    'catalog.in_stock_suffix': 'в\u00A0наличии',
    'catalog.weekly_audit_hint': 'Еженедельный чекап наличия — нажмите, чтобы узнать подробнее',

    // Geo locations
    'geo.city.dalat': 'Далат',
    'geo.city.danang': 'Дананг',
    'geo.city.hcm': 'Хошимин',
    'geo.district.lamvien': 'Ламвьен',
    'geo.district.myan': 'Ми Ан',
    'geo.district.benthanh': 'Бен Тхань',
    'geo.workshop_in': 'Мастерская в',
    'geo.pickup_at_workshop': 'Самовывоз из\u00A0мастерской в',
    'geo.pickup_at_workshop_suffix': 'самовывоз из\u00A0мастерской',
    'catalog.on_showcase_at': 'на\u00A0витрине в',
    'geo.workshop.dalat': 'Мастерская в Далат, Ламвьен',
    'catalog.modal.title': 'Откуда берётся дата проверки',
    'catalog.modal.nm_content': `
      <p><span class="nobr"><strong>NGÀY&nbsp;MAI</strong></span>&nbsp;— это магазин аутентичного хендмейда с&nbsp;живой витриной в&nbsp;Дананге. Среди авторских духов, минералов, керамики и&nbsp;аксессуаров из&nbsp;кожи расположился и&nbsp;мой уголок. Раз в&nbsp;неделю мы сверяем наличие на&nbsp;стенде, и&nbsp;я&nbsp;обновляю сайт&nbsp;— это и&nbsp;есть дата проверки.</p>
      <p>Хендмейд продаётся неторопливо, так что в&nbsp;первые дни после проверки <strong>{item}</strong> практически гарантированно на&nbsp;месте и&nbsp;ждёт вас. Без стопроцентной гарантии, конечно, но&nbsp;в&nbsp;любом случае <span class="nobr">Ngay&nbsp;Mai</span>&nbsp;— это само по&nbsp;себе прекрасное место, куда обязательно стоит заглянуть!</p>
    `,
    'catalog.modal.stock_photo_title': 'Фото витрины ·',
    'catalog.modal.photo_zoom_hint': 'Нажмите, чтобы открыть фото в полном размере',
    'catalog.modal.photo_zoom_badge': 'Увеличить',
    'catalog.modal.nm_hours': shopModalHoursRU,
    'catalog.modal.nm_payment': shopPaymentRU,
    'catalog.modal.nm_maps': 'NGÀY\u00A0MAI на\u00A0Google\u00A0Картах',
    'catalog.modal.catfood_content': `
      <p><span class="nobr"><strong>Cat&nbsp;Food</strong></span>&nbsp;— очень уютный концепт-стор в&nbsp;Хошимине, где среди других авторских вещей живёт и&nbsp;моя скромная витрина.</p>
      <p>Раз в&nbsp;неделю мы бережно сверяем часы и&nbsp;обновляем данные о&nbsp;наличии.</p>
      <p class="checkup__highlight">Будете гулять в&nbsp;районе <span class="nobr">Ben&nbsp;Thanh</span> в&nbsp;Сайгоне&nbsp;— обязательно загляните в&nbsp;гости!</p>
    `,
    'catalog.modal.catfood_maps': 'Cat\u00A0Food на\u00A0Google\u00A0Картах',
    'catalog.modal.close': 'Понятно 💖',

    // Blog UI
    'blog.title': 'Блог & Заметки мастера',
    'blog.subtitle': 'Секреты мастерства, уход за бисером и творческий процесс создания красоты',
    'blog.read_more': 'Читать статью',
    'blog.published_on': 'Опубликовано',
    'blog.back_to_blog': 'Назад в блог',

    // Delivery Page
    'delivery.title': 'Доставка и оплата',
    'delivery.subtitle': 'Бережная доставка по всему миру, подарочная упаковка и гарантия качества',

    // FAQ Page
    'faq.title': 'Частые вопросы',
    'faq.subtitle': 'Всё, что вы хотели знать об индивидуальных заказах, материалах, оплате, доставке и честном подходе к делу',
    'faq.seo_title': 'Частые вопросы (FAQ) — BunnyBearBeads',
    'faq.seo_desc': 'Ответы на частые вопросы об индивидуальных заказах, материалах, фурнитуре, оплате и доставке в BunnyBearBeads.',
    'faq.cta_heading': 'Остались вопросы или есть идея?',
    'faq.cta_text': 'Напишите мне напрямую — с радостью пообщаемся, обсудим бисер, фурнитуру или новый дизайн!',
    'faq.cta_contact': 'Написать мастеру',
    'faq.cta_catalog': 'В каталог',

    // Blog Article CTA
    'blog.explore_catalog': 'Смотреть каталог изделий',

    // Gallery
    'gallery.thumbs_prev': 'Предыдущие миниатюры',
    'gallery.thumbs_next': 'Следующие миниатюры',
    'gallery.thumbs_ribbon': 'Миниатюры товара',
    'gallery.main_prev': 'Предыдущее фото',
    'gallery.main_next': 'Следующее фото',
    'gallery.photo': 'фото',
    'gallery.video': 'видео',
    'gallery.preview': 'превью',
    'gallery.close': 'Закрыть галерею',
    'gallery.fullscreen': 'Во весь экран',
    'gallery.play': 'Воспроизвести видео',
    'gallery.pause': 'Приостановить видео',

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Мастерская авторского бисероплетения. Сделано с любовью 💖',
  },
  vi: {
    // Top Bar Links
    'nav.order': 'Đặt làm trang sức',
    'nav.about': 'Về chúng mình',
    'nav.contacts': 'Liên hệ & Mạng xã hội',
    'nav.where_to_buy': 'Điểm bán',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ — Lưu ý quan trọng!',
    'nav.delivery': 'Vận chuyển',
    'nav.language': 'Ngôn ngữ',

    // Main Categories (Lower Header & Catalog Filters)
    'cat.all': 'Tất cả',
    'cat.bracelets': 'Vòng tay',
    'cat.rings': 'Nhẫn',
    'cat.phone_charms': 'Dây đeo điện thoại (Phone Charms)',
    'cat.keychains': 'Móc khóa',
    'cat.other': 'Khác',
    'search.label': 'Tìm kiếm',
    'search.placeholder': 'Tìm kiếm trang sức, dây đeo, nhẫn...',

    // Site meta
    'site.title': 'BunnyBearBeads — Trang sức cườm thủ công & Phụ kiện',
    'site.description': 'Trang sức cườm thủ công độc bản, dây đeo charm điện thoại, nhẫn và phụ kiện tinh tế.',

    // Catalog UI
    'catalog.title': 'Danh Mục Trang Sức & Phụ Kiện',
    'catalog.subtitle': 'Trang sức cườm thủ công độc bản, dây đeo điện thoại xinh xắn và phụ kiện tinh tế',
    'catalog.in_stock': 'Còn hàng',
    'catalog.order_piece': 'Đặt mua / Tư vấn',
    'catalog.view_details': 'Xem chi tiết',
    'catalog.price_label': 'Giá',
    'catalog.materials_label': 'Chất liệu & Thông số',
    'catalog.breadcrumb': 'Danh mục',
    'catalog.back_to_catalog': 'Quay lại danh mục',
    'catalog.where_to_buy': 'Giao hàng',
    'catalog.credits': 'Credits',
    'catalog.crafted_by': 'Crafted by',
    'catalog.designed_by': 'Designed by',
    'catalog.pcs': 'cái',
    'catalog.remake_order': 'Đặt làm lại (Remake)',
    'catalog.offline_at': 'Trực tiếp tại',
    'catalog.shop_word': 'cửa hàng đối tác',
    'catalog.offline_badge': 'Trực tiếp',
    'catalog.pickup_badge': 'Nhận tại chỗ',
    'catalog.showcase_badge': 'Trưng bày',
    'catalog.online_badge': 'Trực tuyến',
    'catalog.free': 'Miễn phí',
    'catalog.delivery_badge': 'Giao hàng',
    'catalog.delivery_dalat_title': 'Giao hàng hỏa tốc tại Đà Lạt',
    'catalog.delivery_dalat_sub': 'miễn phí, trong ngày',
    'catalog.delivery_dalat_sub_today': courierVI.today,
    'catalog.delivery_dalat_sub_morning': courierVI.morning,
    'catalog.delivery_dalat_sub_tomorrow': courierVI.tomorrow,
    'catalog.delivery_dalat_sub_remake': 'Khi hoàn thành',
    'catalog.pickup_dalat_sub_today': pickupVI.today,
    'catalog.pickup_dalat_sub_morning': pickupVI.morning,
    'catalog.pickup_dalat_sub_tomorrow': pickupVI.tomorrow,
    'catalog.pickup_dalat_sub_remake': 'Khi hoàn thành',
    'catalog.shop_working_hours': shopHoursVI,
    'catalog.delivery_payment_note': paymentVI.delivery,
    'catalog.courier_payment_note': paymentVI.courier,
    'catalog.pickup_payment_note': paymentVI.pickup,
    'catalog.shop_payment_note': paymentVI.shop,
    'catalog.pay_on_receipt': paymentSuffixVI.receipt,
    'catalog.pay_on_pickup': paymentSuffixVI.pickup,
    'catalog.pay_at_checkout': paymentSuffixVI.checkout,
    'catalog.delivery_vn_title': 'Giao hàng toàn Việt Nam',
    'catalog.delivery_vn_sub': 'miễn phí, 1‑3\u00A0ngày',
    'catalog.delivery_vn_sub_remake': '1‑3\u00A0ngày sau khi hoàn thành',
    'catalog.sold_out': 'Tạm hết hàng',
    'catalog.out_of_stock': 'Tạm hết hàng',
    'catalog.craft_remake': 'Sẵn sàng làm lại theo yêu cầu',
    'catalog.craft_time': '2‑4\u00A0ngày',
    'catalog.showcase_title': 'Trưng bày & xưởng',
    'catalog.delivery_hero_badge_ready': 'Miễn phí\u00A0\u00A0·\u00A0\u00A0\u200B1‑3\u00A0ngày',
    'catalog.delivery_hero_badge_remake': 'Miễn phí\u00A0\u00A0·\u00A0\u00A0\u200B2‑4\u00A0ngày',
    'catalog.delivery_from_dalat': deliveryVnReadyVI,
    'catalog.delivery_from_dalat_remake': deliveryVnRemakeVI,
    'catalog.remake_pill_label': remakePillVI.label,
    'catalog.remake_pill_suffix': remakePillVI.suffix,
    'catalog.ready_to_ship': 'có sẵn',
    'catalog.craft_remake_dalat': 'Sẵn sàng làm lại theo yêu cầu tại studio Đà Lạt',
    'catalog.courier_dalat_today': 'Giao hỏa tốc miễn phí tại Đà Lạt ngay trong ngày',
    'catalog.courier_dalat_completion': 'Giao hỏa tốc miễn phí tại Đà Lạt ngay khi hoàn thành',
    'catalog.crafter_note_title': 'Đặt làm theo yêu cầu',
    'catalog.expand': 'Xem thêm ↓',
    'catalog.collapse': 'Thu gọn ↑',
    'catalog.last_checked': 'Đã kiểm tra',
    'catalog.as_of': 'tính đến',
    'catalog.in_stock_suffix': 'có sẵn',
    'catalog.weekly_audit_hint': 'Kiểm kê định kỳ mỗi tuần — bấm để xem chi tiết',

    // Geo locations
    'geo.city.dalat': 'Đà Lạt',
    'geo.city.danang': 'Đà Nẵng',
    'geo.city.hcm': 'Hồ Chí Minh',
    'geo.district.lamvien': 'Lâm Viên',
    'geo.district.myan': 'Mỹ An',
    'geo.district.benthanh': 'Bến Thành',
    'geo.workshop_in': 'Xưởng tại',
    'geo.pickup_at_workshop': 'Nhận tại studio ở',
    'geo.pickup_at_workshop_suffix': 'nhận tại studio',
    'catalog.on_showcase_at': 'trưng bày tại',
    'geo.workshop.dalat': 'Xưởng tại Đà Lạt, Lâm Viên',
    'catalog.modal.title': 'Về ngày “kiểm tra” trên web',
    'catalog.modal.nm_content': `
      <p><span class="nobr"><strong>NGÀY&nbsp;MAI</strong></span> là một tiệm đồ thủ công rất xinh yêu ở <span class="nobr">Đà&nbsp;Nẵng</span>, nơi bạn có thể ghé tận nơi để sờ tận tay, ngắm tận mắt từng món trên kệ. Bên cạnh nước hoa indie, đá thiên nhiên, đồ gốm và đồ da thủ công, bạn cũng sẽ thấy một góc nhỏ của tụi mình ở&nbsp;đó.</p>
      <p>Tụi mình kiểm lại đồ trên kệ mỗi tuần một lần rồi mình mới cập nhật lên web&nbsp;— số lượng và ngày “kiểm tra” bạn thấy chính là từ lần đếm gần nhất&nbsp;đó.</p>
      <p>Đồ cườm bán ra cũng túc tắc thôi, nên tầm vài ngày đầu sau khi cập nhật thì <strong>{item}</strong> gần như chắc chắn vẫn còn trên kệ đợi bạn. Dù không dám hứa\u00A0100%, nhưng ghé <span class="nobr">NGÀY&nbsp;MAI</span> dạo chơi một vòng cũng rất thú vị&nbsp;nha!</p>
    `,
    'catalog.modal.stock_photo_title': 'Ảnh góc trưng bày ·',
    'catalog.modal.photo_zoom_hint': 'Nhấp để xem ảnh kích thước đầy đủ',
    'catalog.modal.photo_zoom_badge': 'Phóng to',
    'catalog.modal.nm_hours': shopModalHoursVI,
    'catalog.modal.nm_payment': shopPaymentVI,
    'catalog.modal.nm_maps': 'NGÀY\u00A0MAI trên Google Maps',
    'catalog.modal.catfood_content': `
      <p><span class="nobr"><strong>Cat&nbsp;Food</strong></span> là concept store xinh xắn tại <span class="nobr">TP.&nbsp;Hồ&nbsp;Chí&nbsp;Minh</span> có góc trưng bày các sản phẩm thủ công của chúng mình.</p>
      <p>Mỗi tuần chúng mình đều đối soát kiểm kê để cập nhật tình trạng có sẵn.</p>
      <p class="checkup__highlight">Nếu ở Sài Gòn, hãy ghé <span class="nobr">Cat&nbsp;Food</span> ngắm trực tiếp nha!</p>
    `,
    'catalog.modal.catfood_maps': 'Cat\u00A0Food trên Google Maps',
    'catalog.modal.close': 'Đã hiểu',

    // Blog UI
    'blog.title': 'Nhật Ký Đan Cườm & Câu Chuyện',
    'blog.subtitle': 'Bí quyết bảo quản trang sức, kỹ thuật đan cườm và tâm sự của nghệ nhân Anna',
    'blog.read_more': 'Đọc bài viết',
    'blog.published_on': 'Ngày đăng',
    'blog.back_to_blog': 'Quay lại bài viết',

    // Delivery Page
    'delivery.title': 'Vận Chuyển & Thanh Toán',
    'delivery.subtitle': 'Giao hàng toàn cầu an toàn, đóng gói hộp quà sang trọng và tận tâm',

    // FAQ Page
    'faq.title': 'Câu hỏi thường gặp',
    'faq.subtitle': 'Mọi điều bạn cần biết về đặt làm riêng, chất liệu, thanh toán, giao hàng và triết lý thủ công chân thật',
    'faq.seo_title': 'Câu Hỏi Thường Gặp (FAQ) — BunnyBearBeads',
    'faq.seo_desc': 'Giải đáp thắc mắc về đặt làm theo yêu cầu, mua hạt cườm, thanh toán tài khoản ngân hàng Việt Nam và vận chuyển tại BunnyBearBeads.',
    'faq.cta_heading': 'Bạn còn câu hỏi hoặc có ý tưởng mới?',
    'faq.cta_text': 'Hãy nhắn tin trực tiếp cho mình nhé — mình luôn sẵn sàng trò chuyện về hạt cườm, phụ kiện hay mẫu thiết kế mới!',
    'faq.cta_contact': 'Liên hệ với mình',
    'faq.cta_catalog': 'Xem danh mục',

    // Blog Article CTA
    'blog.explore_catalog': 'Xem các mẫu trang sức',

    // Gallery
    'gallery.thumbs_prev': 'Hình thu nhỏ trước',
    'gallery.thumbs_next': 'Hình thu nhỏ tiếp theo',
    'gallery.thumbs_ribbon': 'Hình thu nhỏ sản phẩm',
    'gallery.main_prev': 'Ảnh trước',
    'gallery.main_next': 'Ảnh tiếp theo',
    'gallery.photo': 'ảnh',
    'gallery.video': 'video',
    'gallery.preview': 'bản xem trước',
    'gallery.close': 'Đóng bộ sưu tập',
    'gallery.fullscreen': 'Toàn màn hình',
    'gallery.play': 'Phát video',
    'gallery.pause': 'Tạm dừng video',

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Xưởng thủ công cườm nghệ thuật. Làm bằng cả trái tim 💖',
  },
} as const;

export type TranslationKey = keyof typeof ui[typeof defaultLang];
