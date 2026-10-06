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
    'nav.about': 'About Us',
    'nav.contacts': 'Contacts & Socials',
    'nav.where_to_buy': 'Where to Buy',
    'nav.blog': 'Blog',
    'nav.delivery': 'Delivery',
    'nav.language': 'Language',

    // Main Categories (Lower Header)
    'cat.all': 'All Catalog',
    'cat.jewelry': 'Finished Jewelry',
    'cat.beads': 'Beads',
    'cat.tools': 'Tools',
    'cat.findings': 'Findings',
    'search.label': 'Search',
    'search.placeholder': 'Search jewelry, beads, tools...',

    // Site meta
    'site.title': 'BunnyBearBeads — Handcrafted Beadwork & Artisan Jewelry',
    'site.description': 'Unique handmade beadwork jewelry, Japanese Miyuki beads, and precision craft tools.',

    // Catalog UI
    'catalog.title': 'Product Catalog',
    'catalog.subtitle': 'Artisan finished jewelry, premium Japanese seed beads, and precision weaving tools',
    'catalog.in_stock': 'In Stock',
    'catalog.order_piece': 'Order / Inquire',
    'catalog.view_details': 'View Details',
    'catalog.price_label': 'Price',
    'catalog.materials_label': 'Materials & Specs',
    'catalog.back_to_catalog': 'Back to Catalog',

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
    'nav.about': 'О нас',
    'nav.contacts': 'Контакты и соц.сети',
    'nav.where_to_buy': 'Где купить',
    'nav.blog': 'Блог',
    'nav.delivery': 'Доставка',
    'nav.language': 'Язык',

    // Main Categories (Lower Header)
    'cat.all': 'Весь каталог',
    'cat.jewelry': 'Готовые украшения',
    'cat.beads': 'Бисер',
    'cat.tools': 'Инструменты',
    'cat.findings': 'Фурнитура',
    'search.label': 'Поиск',
    'search.placeholder': 'Поиск украшений, бисера, инструментов...',

    // Site meta
    'site.title': 'BunnyBearBeads — Авторские украшения из бисера & Рукоделие',
    'site.description': 'Уникальные авторские украшения из бисера, японский бисер Miyuki и инструменты для рукоделия.',

    // Catalog UI
    'catalog.title': 'Каталог продукции',
    'catalog.subtitle': 'Авторские готовые украшения, японский бисер премиум-класса и профессиональные инструменты',
    'catalog.in_stock': 'В наличии',
    'catalog.order_piece': 'Заказать',
    'catalog.view_details': 'Подробнее',
    'catalog.price_label': 'Стоимость',
    'catalog.materials_label': 'Характеристики и материалы',
    'catalog.back_to_catalog': 'Назад в каталог',

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
    'nav.about': 'Về chúng mình',
    'nav.contacts': 'Liên hệ & Mạng xã hội',
    'nav.where_to_buy': 'Điểm bán',
    'nav.blog': 'Blog',
    'nav.delivery': 'Vận chuyển',
    'nav.language': 'Ngôn ngữ',

    // Main Categories (Lower Header)
    'cat.all': 'Tất cả danh mục',
    'cat.jewelry': 'Trang sức hoàn thiện',
    'cat.beads': 'Hạt cườm',
    'cat.tools': 'Dụng cụ',
    'cat.findings': 'Phụ kiện',
    'search.label': 'Tìm kiếm',
    'search.placeholder': 'Tìm kiếm trang sức, hạt cườm, dụng cụ...',

    // Site meta
    'site.title': 'BunnyBearBeads — Trang sức cườm thủ công & Dụng cụ đan cườm',
    'site.description': 'Trang sức cườm thủ công độc bản, hạt cườm Miyuki Nhật Bản và dụng cụ đan cườm tinh xảo.',

    // Catalog UI
    'catalog.title': 'Danh Mục Sản Phẩm',
    'catalog.subtitle': 'Trang sức cườm thủ công, hạt cườm Nhật Bản cao cấp và dụng cụ chuyên nghiệp',
    'catalog.in_stock': 'Còn hàng',
    'catalog.order_piece': 'Đặt mua / Tư vấn',
    'catalog.view_details': 'Xem chi tiết',
    'catalog.price_label': 'Giá',
    'catalog.materials_label': 'Chất liệu & Thông số',
    'catalog.back_to_catalog': 'Quay lại danh mục',

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
