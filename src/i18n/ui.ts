export const languages = {
  en: {
    code: 'en',
    label: 'EN',
    name: 'English',
    flag: '🇬🇧',
  },
  vi: {
    code: 'vi',
    label: 'VI',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
  },
  ru: {
    code: 'ru',
    label: 'RU',
    name: 'Русский',
    flag: '🇷🇺',
  },
} as const;

export type SupportedLanguage = keyof typeof languages;
export const defaultLang: SupportedLanguage = 'en';

export const ui = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.catalog': 'Catalog',
    'nav.blog': 'Blog',
    'nav.about': 'About Master',
    'nav.contacts': 'Contacts',

    // Site meta
    'site.title': 'BunnyBearBeads — Handcrafted Beadwork & Artisan Jewelry',
    'site.description': 'Unique handmade beadwork jewelry, necklaces, bracelets, and custom artisan craft by BunnyBearBeads.',

    // Catalog & Blog UI
    'catalog.title': 'Artisan Jewelry Catalog',
    'catalog.subtitle': 'Explore unique necklaces, chokers, and bracelets crafted with Japanese glass beads',
    'catalog.in_stock': 'In Stock',
    'catalog.order_piece': 'Order Piece',
    'catalog.view_details': 'View Details',
    'catalog.price_label': 'Price',
    'catalog.materials_label': 'Materials',
    'catalog.back_to_catalog': 'Back to Catalog',

    'blog.title': 'Beadwork Journal & Stories',
    'blog.subtitle': 'Jewelry care guides, craftsmanship secrets, and creative thoughts from Anna',
    'blog.read_more': 'Read Article',
    'blog.published_on': 'Published on',
    'blog.back_to_blog': 'Back to Journal',

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Artisan Beadwork Workshop. Crafted with love 💖',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.catalog': 'Danh mục',
    'nav.blog': 'Bài viết',
    'nav.about': 'Về tác giả',
    'nav.contacts': 'Liên hệ',

    // Site meta
    'site.title': 'BunnyBearBeads — Trang sức cườm thủ công nghệ thuật',
    'site.description': 'Trang sức cườm handmade độc bản, vòng cổ, lắc tay và phụ kiện nghệ thuật tinh xảo từ BunnyBearBeads.',

    // Catalog & Blog UI
    'catalog.title': 'Bộ Sưu Tập Trang Sức Cườm',
    'catalog.subtitle': 'Khám phá các mẫu vòng cổ, choker và lắc tay độc bản đan từ hạt cườm Nhật Bản',
    'catalog.in_stock': 'Còn hàng',
    'catalog.order_piece': 'Đặt mua ngay',
    'catalog.view_details': 'Xem chi tiết',
    'catalog.price_label': 'Giá',
    'catalog.materials_label': 'Chất liệu',
    'catalog.back_to_catalog': 'Quay lại danh mục',

    'blog.title': 'Nhật Ký Đan Cườm & Câu Chuyện',
    'blog.subtitle': 'Bí quyết bảo quản trang sức, kỹ thuật đan cườm và tâm sự của nghệ nhân Anna',
    'blog.read_more': 'Đọc bài viết',
    'blog.published_on': 'Ngày đăng',
    'blog.back_to_blog': 'Quay lại bài viết',

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Xưởng thủ công cườm nghệ thuật. Làm bằng cả trái tim 💖',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.catalog': 'Каталог',
    'nav.blog': 'Блог',
    'nav.about': 'О мастере',
    'nav.contacts': 'Контакты',

    // Site meta
    'site.title': 'BunnyBearBeads — Авторские украшения из бисера & Рукоделие',
    'site.description': 'Уникальные авторские украшения из бисера ручной работы, колье, браслеты и мастер-классы по бисероплетению BunnyBearBeads.',

    // Catalog & Blog UI
    'catalog.title': 'Каталог авторских украшений',
    'catalog.subtitle': 'Уникальные колье, чокеры и браслеты ручной работы из японского бисера',
    'catalog.in_stock': 'В наличии',
    'catalog.order_piece': 'Заказать изделие',
    'catalog.view_details': 'Подробнее',
    'catalog.price_label': 'Стоимость',
    'catalog.materials_label': 'Материалы',
    'catalog.back_to_catalog': 'Назад в каталог',

    'blog.title': 'Блог & Заметки мастера',
    'blog.subtitle': 'Секреты мастерства, уход за бисером и творческий процесс создания красоты',
    'blog.read_more': 'Читать статью',
    'blog.published_on': 'Опубликовано',
    'blog.back_to_blog': 'Назад в блог',

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Мастерская авторского бисероплетения. Сделано с любовью 💖',
  },
} as const;

export type TranslationKey = keyof typeof ui[typeof defaultLang];
