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
    'nav.about': 'About Master',
    'nav.contacts': 'Contacts',
    'nav.collection': 'Collections',

    // Site meta
    'site.title': 'BunnyBearBeads — Handcrafted Beadwork & Artisan Jewelry',
    'site.description': 'Unique handmade beadwork jewelry, necklaces, bracelets, and custom artisan craft by BunnyBearBeads.',

    // Hero Section
    'hero.badge': 'Artisan Beadweaving & Handcrafted',
    'hero.title_prefix': 'Welcome to the world of ',
    'hero.title_accent': 'delicate beadwork!',
    'hero.author_greeting': 'Hello! My name is Anna',
    'hero.author_tagline': 'I am the creator and master artisan behind the BunnyBearBeads brand.',
    'hero.author_p1': 'Welcome to my cozy creative sanctuary! For me, bead weaving is far more than a craft — it is meditation and the art of shaping grace into tactile objects. Every tiny bead of selected Japanese and Czech glass, every crystal passes thoughtfully through my hands.',
    'hero.author_p2': 'Each creation holds warmth, patience, and artistic inspiration. Made specifically for people who cherish uniqueness, microscopic detail, and soulful craftsmanship.',
    'hero.author_name': 'Anna BunnyBear',
    'hero.author_role': 'Master of Fine Bead Art',
    'hero.badge_crafted': '100% Handcrafted',
    'hero.badge_unique': 'One-of-a-kind Pieces',
    'hero.btn_explore': 'Explore Collection',
    'hero.btn_order': 'Custom Order',

    // Features Section
    'features.title': 'Dedication to Every Single Stitch',
    'features.subtitle': 'Why BunnyBearBeads jewelry is created with genuine love and mastery',
    'feature1.title': 'Premium Materials',
    'feature1.desc': 'We only use durable Japanese Miyuki & Toho beads, genuine gemstones, and Swarovski crystals.',
    'feature2.title': 'Artisanal Design',
    'feature2.desc': 'Every pattern and weave is drafted uniquely by hand, free from mass-produced moulds or factory stencils.',
    'feature3.title': 'Signature Packaging',
    'feature3.desc': 'Each jewelry treasure arrives in an elegant gift box accompanied by a warm personal touch.',

    // About Page
    'about.title': 'About the Artist & BunnyBearBeads',
    'about.subtitle': 'Philosophy, creative journey, and passion for miniature art',
    'about.story_heading': 'The Journey into Bead Weaving',
    'about.story_text1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'about.story_text2': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'about.materials_heading': 'Materials & Technique',
    'about.materials_text': 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.',

    // Contacts Page
    'contacts.title': 'Get in Touch',
    'contacts.subtitle': 'Commission a personalized piece, ask questions, or just say hello',
    'contacts.intro_heading': 'We’d love to hear from you',
    'contacts.intro_text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Whether you need a bespoke wedding accessory, an everyday talisman, or a gift for someone special, reach out through your favorite channel below.',
    'contacts.location_label': 'Studio Location',
    'contacts.location_value': 'Da Nang / Worldwide Shipping',
    'contacts.email_label': 'Email',
    'contacts.email_value': 'hello@bunnybearbeads.com',
    'contacts.telegram_label': 'Telegram',
    'contacts.telegram_value': '@bunnybearbeads',
    'contacts.instagram_label': 'Instagram',
    'contacts.instagram_value': '@bunnybearbeads',
    'contacts.form_name': 'Your Name',
    'contacts.form_email': 'Your Email or Telegram',
    'contacts.form_message': 'Tell us about your idea...',
    'contacts.form_submit': 'Send Inquiry',

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Artisan Beadwork Workshop. Crafted with love 💖',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.about': 'Về tác giả',
    'nav.contacts': 'Liên hệ',
    'nav.collection': 'Bộ sưu tập',

    // Site meta
    'site.title': 'BunnyBearBeads — Trang sức cườm thủ công nghệ thuật',
    'site.description': 'Trang sức cườm handmade độc bản, vòng cổ, lắc tay và phụ kiện nghệ thuật tinh xảo từ BunnyBearBeads.',

    // Hero Section
    'hero.badge': 'Nghệ thuật đan cườm & Thủ công tinh xảo',
    'hero.title_prefix': 'Chào mừng bạn đến với thế giới ',
    'hero.title_accent': 'hạt cườm tinh xảo!',
    'hero.author_greeting': 'Xin chào! Mình là Anna',
    'hero.author_tagline': 'Người sáng lập và nghệ nhân chính của thương hiệu BunnyBearBeads.',
    'hero.author_p1': 'Chào mừng bạn đến với góc sáng tạo ấm cúng của mình! Đối với mình, đan hạt cườm không đơn thuần là một sở thích, mà là sự thiền định và nghệ thuật tạo tác vẻ đẹp. Từng hạt cườm Nhật Bản, Tiệp Khắc và từng viên pha lê đều được nâng niu qua đôi tay tỉ mỉ.',
    'hero.author_p2': 'Trong từng sản phẩm, mình gửi gắm sự ấm áp, bình yên và nguồn cảm hứng. Tác phẩm dành riêng cho những ai trân trọng nét độc đáo, chi tiết vi mô và giá trị của lao động thủ công từ trái tim.',
    'hero.author_name': 'Anna BunnyBear',
    'hero.author_role': 'Nghệ nhân đan cườm nghệ thuật',
    'hero.badge_crafted': '100% Thủ công',
    'hero.badge_unique': 'Phiên bản độc bản',
    'hero.btn_explore': 'Xem bộ sưu tập',
    'hero.btn_order': 'Đặt làm theo yêu cầu',

    // Features Section
    'features.title': 'Tỉ mỉ trong từng đường kim mũi chỉ',
    'features.subtitle': 'Lý do trang sức BunnyBearBeads luôn chứa đựng tình yêu và tâm huyết',
    'feature1.title': 'Nguyên liệu cao cấp',
    'feature1.desc': 'Sử dụng độc quyền hạt cườm Miyuki & Toho Nhật Bản cao cấp, đá tự nhiên và pha lê Swarovski.',
    'feature2.title': 'Thiết kế thủ công độc bản',
    'feature2.desc': 'Mỗi mẫu vẽ và hoạ tiết đều được thiết kế riêng, không sản xuất hàng loạt hay rập khuôn công nghiệp.',
    'feature3.title': 'Hộp quà sang trọng',
    'feature3.desc': 'Từng món trang sức được đóng gói trang nhã trong hộp thương hiệu kèm lời nhắn thân thương.',

    // About Page
    'about.title': 'Về Tác Giả & BunnyBearBeads',
    'about.subtitle': 'Triết lý nghệ thuật, hành trình sáng tạo và niềm đam mê với nghệ thuật vi mô',
    'about.story_heading': 'Hành trình đến với nghệ thuật đan cườm',
    'about.story_text1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'about.story_text2': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'about.materials_heading': 'Chất liệu & Kỹ thuật chế tác',
    'about.materials_text': 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.',

    // Contacts Page
    'contacts.title': 'Liên hệ với chúng mình',
    'contacts.subtitle': 'Đặt làm trang sức theo yêu cầu riêng, tư vấn kích cỡ hoặc trò chuyện cùng nghệ nhân',
    'contacts.intro_heading': 'Chúng mình rất vui được lắng nghe bạn',
    'contacts.intro_text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dù bạn muốn một phụ kiện ngày cưới đặc biệt hay một món quà ý nghĩa, hãy nhắn tin cho BunnyBearBeads nhé.',
    'contacts.location_label': 'Xưởng sáng tạo',
    'contacts.location_value': 'Đà Nẵng / Giao hàng toàn cầu',
    'contacts.email_label': 'Email',
    'contacts.email_value': 'hello@bunnybearbeads.com',
    'contacts.telegram_label': 'Telegram',
    'contacts.telegram_value': '@bunnybearbeads',
    'contacts.instagram_label': 'Instagram',
    'contacts.instagram_value': '@bunnybearbeads',
    'contacts.form_name': 'Họ và tên',
    'contacts.form_email': 'Email hoặc Số điện thoại/Zalo',
    'contacts.form_message': 'Ý tưởng hoặc yêu cầu của bạn...',
    'contacts.form_submit': 'Gửi tin nhắn',

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Xưởng thủ công cườm nghệ thuật. Làm bằng cả trái tim 💖',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О мастере',
    'nav.contacts': 'Контакты',
    'nav.collection': 'Коллекции',

    // Site meta
    'site.title': 'BunnyBearBeads — Авторские украшения из бисера & Рукоделие',
    'site.description': 'Уникальные авторские украшения из бисера ручной работы, колье, браслеты и мастер-классы по бисероплетению BunnyBearBeads.',

    // Hero Section
    'hero.badge': 'Авторское бисероплетение & Ручная работа',
    'hero.title_prefix': 'Приветствую вас в мире ',
    'hero.title_accent': 'изящного бисера!',
    'hero.author_greeting': 'Здравствуйте! Меня зовут Анна',
    'hero.author_tagline': 'Я создатель и главный мастер бренда BunnyBearBeads.',
    'hero.author_p1': 'Добро пожаловать в мое уютное творческое пространство! Для меня бисероплетение — это не просто хобби или ремесло, а настоящая медитация и искусство создания красоты. Каждая крошечная бусинка отборного японского и чешского бисера, каждый хрустальный кристалл проходят через мои руки, чтобы превратиться в изысканное украшение.',
    'hero.author_p2': 'В каждое изделие я вкладываю частичку тепла, гармонии и вдохновения. Мои работы создаются для тех, кто ценит уникальность, тонкую детализацию и душевный подход к ручному труду.',
    'hero.author_name': 'Анна BunnyBear',
    'hero.author_role': 'Мастер художественного бисероплетения',
    'hero.badge_crafted': '100% Handcrafted',
    'hero.badge_unique': 'Единственный экземпляр',
    'hero.btn_explore': 'Смотреть коллекцию',
    'hero.btn_order': 'Заказать индивидуально',

    // Features Section
    'features.title': 'Особый подход к каждому стежку',
    'features.subtitle': 'Почему изделия из бисера BunnyBearBeads создаются с любовью',
    'feature1.title': 'Премиум материалы',
    'feature1.desc': 'Использую только стойкий японский бисер Miyuki & Toho, натуральные камни и кристаллы Swarovski.',
    'feature2.title': 'Авторский дизайн',
    'feature2.desc': 'Каждая схема и узор разрабатываются индивидуально, без массовых шаблонов и штамповок.',
    'feature3.title': 'Подарочная упаковка',
    'feature3.desc': 'Каждое украшение бережно упаковывается в фирменную коробочку с приятным сюрпризом внутри.',

    // About Page
    'about.title': 'О мастере & BunnyBearBeads',
    'about.subtitle': 'Философия бренда, творческий путь и любовь к тонкому искусству',
    'about.story_heading': 'Путь к художественному бисероплетению',
    'about.story_text1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'about.story_text2': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'about.materials_heading': 'Материалы и технологии работы',
    'about.materials_text': 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.',

    // Contacts Page
    'contacts.title': 'Связаться с мастерской',
    'contacts.subtitle': 'Заказ индивидуального украшения, вопросы по уходу и доставка',
    'contacts.intro_heading': 'Буду рада воплотить вашу идею',
    'contacts.intro_text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Напишите мне в удобном мессенджере или оставьте заявку через форму — обсудим цветовую гамму, размер и детали будущего украшения.',
    'contacts.location_label': 'Локация мастерской',
    'contacts.location_value': 'Дананг / Доставка по всему миру',
    'contacts.email_label': 'Электронная почта',
    'contacts.email_value': 'hello@bunnybearbeads.com',
    'contacts.telegram_label': 'Telegram',
    'contacts.telegram_value': '@bunnybearbeads',
    'contacts.instagram_label': 'Instagram',
    'contacts.instagram_value': '@bunnybearbeads',
    'contacts.form_name': 'Ваше имя',
    'contacts.form_email': 'Email или Telegram для связи',
    'contacts.form_message': 'Опишите ваше пожелание...',
    'contacts.form_submit': 'Отправить сообщение',

    // Footer
    'footer.copyright': '© 2026 BunnyBearBeads — Мастерская авторского бисероплетения. Сделано с любовью 💖',
  },
} as const;

export type TranslationKey = keyof typeof ui[typeof defaultLang];
