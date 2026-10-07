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
    'catalog.back_to_catalog': 'Back to Catalog',
    'catalog.where_to_buy': 'Where to Buy',
    'catalog.credits': 'Credits',
    'catalog.crafted_by': 'Crafted by',
    'catalog.designed_by': 'Designed by',
    'catalog.pcs': 'pcs',
    'catalog.remake_order': 'Request a remake',
    'catalog.offline_at': 'Offline at',
    'catalog.shop_word': 'shop',
    'catalog.offline_badge': 'Offline',
    'catalog.online_badge': 'Online Store',
    'catalog.delivery_badge': 'Delivery',
    'catalog.delivery_dalat_title': 'Courier in Da Lat',
    'catalog.delivery_dalat_sub': 'free, same-day delivery',
    'catalog.delivery_vn_title': 'Shipping across Vietnam',
    'catalog.delivery_vn_sub': 'free, 1–3 days',
    'catalog.last_checked': 'Stock checked',
    'catalog.as_of': 'as of',
    'catalog.weekly_audit_hint': 'Weekly stock verification — click for details',

    // Geo locations
    'geo.city.dalat': 'Da Lat',
    'geo.city.danang': 'Da Nang',
    'geo.city.hcm': 'Ho Chi Minh',
    'geo.district.lamvien': 'Lam Vien',
    'geo.district.myan': 'My An',
    'geo.district.benthanh': 'Ben Thanh',
    'catalog.modal.title': 'How Partner Store Stock Works',
    'catalog.modal.nm_p1': 'NGÀY MAI is a physical artisan craft shop in Da Nang. Among jewelry with natural stones, leather goods, ceramics, and woodwork, you will find my humble showcase.',
    'catalog.modal.nm_p2': 'Once a week we sync up, and I update stock availability on this website you are currently browsing. That explains the date.',
    'catalog.modal.nm_p2_sub': 'Handcrafted items sell at a steady pace, and within three days after an update {item} is most likely still right there waiting for you. Yet a 100% guarantee, alas, cannot be made.',
    'catalog.modal.nm_p3': 'In any case, it is a wonderful place. If you are currently in Da Nang, be sure to pay them a visit!',
    'catalog.modal.stock_photo_title': 'Showcase stock photo as of',
    'catalog.modal.photo_zoom_hint': 'Click to open full size photo',
    'catalog.modal.photo_zoom_badge': 'Zoom in',
    'catalog.modal.nm_hours': 'Open daily: 8:00 AM – 8:00 PM (no breaks)',
    'catalog.modal.nm_maps': 'View NGÀY MAI on Google Maps',
    'catalog.modal.catfood_p1': 'Cat Food is a cozy concept store in Ho Chi Minh City featuring my humble showcase of handmade beadwork.',
    'catalog.modal.catfood_p2': 'Once a week, we conduct a mutual stock checkup and update availability.',
    'catalog.modal.catfood_p3': 'If you are visiting Ben Thanh in Saigon, feel free to stop by and check out the pieces in person!',
    'catalog.modal.catfood_maps': 'View Cat Food on Google Maps',
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

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Artisan Beadwork Workshop. Crafted with love 💖',
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
    'catalog.back_to_catalog': 'Назад в каталог',
    'catalog.where_to_buy': 'Где купить',
    'catalog.credits': 'Credits',
    'catalog.crafted_by': 'Crafted by',
    'catalog.designed_by': 'Designed by',
    'catalog.pcs': 'шт',
    'catalog.remake_order': 'Заказать к ремейку',
    'catalog.offline_at': 'Оффлайн в',
    'catalog.shop_word': 'магазин',
    'catalog.offline_badge': 'Оффлайн',
    'catalog.online_badge': 'Онлайн',
    'catalog.delivery_badge': 'Доставка',
    'catalog.delivery_dalat_title': 'Курьер по Далату',
    'catalog.delivery_dalat_sub': 'бесплатно, в день заказа',
    'catalog.delivery_vn_title': 'Пересылка по Вьетнаму',
    'catalog.delivery_vn_sub': 'бесплатно, 1–3 дня',
    'catalog.last_checked': 'Проверено',
    'catalog.as_of': 'на',
    'catalog.weekly_audit_hint': 'Еженедельный чекап наличия — нажмите, чтобы узнать подробнее',

    // Geo locations
    'geo.city.dalat': 'Далат',
    'geo.city.danang': 'Дананг',
    'geo.city.hcm': 'Хошимин',
    'geo.district.lamvien': 'Ламвьен',
    'geo.district.myan': 'Ми Ан',
    'geo.district.benthanh': 'Бен Тхань',
    'catalog.modal.title': 'Как устроено наличие в магазинах',
    'catalog.modal.nm_p1': '«NGÀY MAI» — физический магазин ремесленных изделий в Дананге. Среди украшений с натуральными камнями, аксессуаров из кожи, керамики и дерева расположилась и моя скромная витрина.',
    'catalog.modal.nm_p2': 'Раз в неделю мы сверяем часы, и я обновляю наличие у себя на сайте, который вы сейчас просматриваете. Отсюда и дата.',
    'catalog.modal.nm_p2_sub': 'Изделия продаются неторопливо, и скорее всего в течение трех дней после обновления {item} все еще на месте и ожидает вас. Но стопроцентную гарантию, увы, дать невозможно.',
    'catalog.modal.nm_p3': 'В любом случае это прекрасное место. Если вы сейчас в Дананге, обязательно загляните к ним в гости!',
    'catalog.modal.stock_photo_title': 'Фото наличия от',
    'catalog.modal.photo_zoom_hint': 'Нажмите, чтобы открыть фото в полном размере',
    'catalog.modal.photo_zoom_badge': 'Увеличить',
    'catalog.modal.nm_hours': 'С 8:00 до 20:00 без обеда и выходных',
    'catalog.modal.nm_maps': 'Открыть NGÀY MAI на Google Картах',
    'catalog.modal.catfood_p1': 'Cat Food — очень уютный концепт-стор в Хошимине, где среди других авторских вещей живёт и моя скромная витрина.',
    'catalog.modal.catfood_p2': 'Раз в неделю мы бережно сверяем часы и обновляем данные о наличии.',
    'catalog.modal.catfood_p3': 'Будете гулять в районе Ben Thanh в Сайгоне — обязательно загляните в гости!',
    'catalog.modal.catfood_maps': 'Открыть Cat Food на Google Картах',
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
    'catalog.back_to_catalog': 'Quay lại danh mục',
    'catalog.where_to_buy': 'Điểm Bán & Mua Hàng',
    'catalog.credits': 'Credits',
    'catalog.crafted_by': 'Crafted by',
    'catalog.designed_by': 'Designed by',
    'catalog.pcs': 'cái',
    'catalog.remake_order': 'Đặt làm lại (Remake)',
    'catalog.offline_at': 'Trực tiếp tại',
    'catalog.shop_word': 'cửa hàng',
    'catalog.offline_badge': 'Trực tiếp',
    'catalog.online_badge': 'Trực tuyến',
    'catalog.delivery_badge': 'Giao hàng',
    'catalog.delivery_dalat_title': 'Giao hàng hỏa tốc tại Đà Lạt',
    'catalog.delivery_dalat_sub': 'miễn phí, trong ngày',
    'catalog.delivery_vn_title': 'Chuyển phát toàn quốc',
    'catalog.delivery_vn_sub': 'miễn phí, 1–3 ngày',
    'catalog.last_checked': 'Đã kiểm tra',
    'catalog.as_of': 'tính đến ngày',
    'catalog.weekly_audit_hint': 'Kiểm kê định kỳ mỗi tuần — bấm để xem chi tiết',

    // Geo locations
    'geo.city.dalat': 'Đà Lạt',
    'geo.city.danang': 'Đà Nẵng',
    'geo.city.hcm': 'Hồ Chí Minh',
    'geo.district.lamvien': 'Lâm Viên',
    'geo.district.myan': 'Mỹ An',
    'geo.district.benthanh': 'Bến Thành',
    'catalog.modal.title': 'Về Tình Trạng Hàng Tại Cửa Hàng Đối Tác',
    'catalog.modal.nm_p1': '«NGÀY MAI» là cửa hàng thủ công trực tiếp (offline) tại Đà Nẵng, nơi trưng bày quầy hàng nhỏ xinh của mình cùng với nhiều nghệ nhân độc lập khác.',
    'catalog.modal.nm_p2': 'Mỗi tuần chúng mình đều đối soát kiểm kê để cập nhật tình trạng có sẵn.',
    'catalog.modal.nm_p2_sub': 'Đồ thủ công bán không quá nhanh, và rất có thể trong vòng ba ngày sau khi cập nhật {item} vẫn đang chờ bạn trên kệ. Nhưng 100% bảo đảm thì tiếc là không thể.',
    'catalog.modal.nm_p3': 'Dù sao thì đây cũng là một không gian tuyệt vời. Nếu ở Đà Nẵng, bạn hãy ghé thăm shop nhé!',
    'catalog.modal.stock_photo_title': 'Ảnh chụp kệ hàng ngày',
    'catalog.modal.photo_zoom_hint': 'Nhấp để xem ảnh kích thước đầy đủ',
    'catalog.modal.photo_zoom_badge': 'Phóng to',
    'catalog.modal.nm_hours': 'Mở cửa từ 8:00 đến 20:00 hàng ngày (không nghỉ trưa)',
    'catalog.modal.nm_maps': 'Mở NGÀY MAI trên Google Maps',
    'catalog.modal.catfood_p1': 'Cat Food là concept store xinh xắn tại TP. Hồ Chí Minh có quầy trưng bày các sản phẩm thủ công của chúng mình.',
    'catalog.modal.catfood_p2': 'Mỗi tuần chúng mình đều đối soát kiểm kê để cập nhật tình trạng có sẵn.',
    'catalog.modal.catfood_p3': 'Nếu ở Sài Gòn, hãy ghé Cat Food ngắm trực tiếp nha!',
    'catalog.modal.catfood_maps': 'Mở Cat Food trên Google Maps',
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

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Xưởng thủ công cườm nghệ thuật. Làm bằng cả trái tim 💖',
  },
} as const;

export type TranslationKey = keyof typeof ui[typeof defaultLang];
