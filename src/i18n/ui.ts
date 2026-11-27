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
    ru: 'Брелки',
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
  // Модалка «Напишите мне» (src/components/ContactModal) — выдержка из контактов
  'contact_modal.title': {
    en: 'Message me',
    ru: 'Напишите мне',
    vi: 'Nhắn cho mình',
  },
  // {from}, {to} — часы из siteSettings.onlineHours («10 утра», «8 вечера»)
  'contact_modal.text': {
    en: '<p>I’m usually online from {from} to {to}, Vietnam time. And I’ll be sure to reply as soon as I check my phone.</p>',
    ru: '<p>Обычно я&nbsp;на&nbsp;связи с&nbsp;{from} до&nbsp;{to} по&nbsp;Вьетнаму. И&nbsp;я&nbsp;обязательно отвечу, как только загляну в&nbsp;телефон.</p>',
    vi: '<p>Mình thường online từ {from} đến {to}. Và mình nhất định sẽ trả lời ngay khi xem điện thoại nha.</p>',
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
  'catalog.inquiry.write_via': {
    en: 'Message via',
    ru: 'Написать в',
    vi: 'Nhắn qua',
  },
  'catalog.inquiry.write': {
    en: 'Message',
    ru: 'Написать',
    vi: 'Nhắn tin',
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
    en: 'Materials',
    ru: 'Материалы',
    vi: 'Chất liệu',
  },
  // Размер и вес изделия (src/utils/size.ts). {value} — число с единицей («1,2 см»).
  // Обхват запястья у браслета сайт считает сам: длина / 1.1
  // Заголовок секции: смотря что есть — размер, вес или оба
  'size.heading': {
    en: 'Size',
    ru: 'Размер',
    vi: 'Kích thước',
  },
  'size.heading_weight': {
    en: 'Weight',
    ru: 'Вес',
    vi: 'Trọng lượng',
  },
  'size.heading_both': {
    en: 'Size & weight',
    ru: 'Размер и вес',
    vi: 'Kích thước & trọng lượng',
  },
  'size.weight': {
    en: 'Weight: {value}',
    ru: 'Вес: {value}',
    vi: 'Trọng lượng: {value}',
  },
  'size.g': {
    en: '{value} g',
    ru: '{value} г',
    vi: '{value} g',
  },
  'size.cm': {
    en: '{value} cm',
    ru: '{value} см',
    vi: '{value} cm',
  },
  'size.width': {
    en: 'Width: {value}',
    ru: 'Ширина: {value}',
    vi: 'Chiều rộng: {value}',
  },
  'size.height': {
    en: 'Height: {value}',
    ru: 'Высота: {value}',
    vi: 'Chiều cao: {value}',
  },
  'size.length': {
    en: 'Length: {value}',
    ru: 'Длина: {value}',
    vi: 'Chiều dài: {value}',
  },
  'size.wrist_from': {
    en: 'Fits wrists from {value}',
    ru: 'На запястье от {value}',
    vi: 'Vừa cổ tay từ {value}',
  },
  'size.charm': {
    en: '{width} × {height}, without the attachment',
    ru: '{width} × {height} без учёта крепления',
    vi: '{width} × {height}, không tính móc',
  },
  // Размер кольца в шапке товара, рядом с ценой (sizeFit в utils/size.ts)
  'size.ring_fit': {
    en: 'Ring size {value}',
    ru: 'Размер кольца {value}',
    vi: 'Cỡ nhẫn {value}',
  },
  'size.ring_beads': {
    en: 'Width: {value} beads',
    ru: 'Ширина в бисеринах: {value}',
    vi: 'Chiều rộng: {value} hạt',
  },
  'size.ring_finger': {
    en: 'Fits finger circumference {value}',
    ru: 'На палец с обхватом {value}',
    vi: 'Vừa ngón tay có chu vi {value}',
  },
  'size.ring_size': {
    en: 'Ring size {value}',
    ru: 'Размер {value}',
    vi: 'Cỡ nhẫn {value}',
  },
  // Материалы (src/utils/materials.ts): названия бисера не переводятся, переводятся приписки
  'materials.beads_note': {
    en: 'high-quality Japanese seed beads',
    ru: 'качественный японский бисер',
    vi: 'hạt cườm Nhật Bản chất lượng cao',
  },
  // Toho Aiko и пара с ним
  'materials.beads_note_premium': {
    en: 'the world’s best seed beads',
    ru: 'лучший в мире бисер',
    vi: 'loại hạt cườm tốt nhất thế giới',
  },
  'materials.colors': {
    en: 'Colors:',
    ru: 'Цвета:',
    vi: 'Màu:',
  },
  // Бусины (materials.additionalBeads): {color} — цвет, если он один (иначе убирается). Первое слово строки сайт
  // делает заглавным, поэтому названия без бренда — со строчной: в паре они идут второй частью строки
  'materials.additional_bead.unbranded_bicones': {
    en: 'unbranded {color} bicones',
    ru: '{color} биконусы без бренда',
    vi: 'hạt bicone {color} không thương hiệu',
  },
  'materials.additional_bead.preciosa_bicones': {
    en: 'Preciosa {color} bicones',
    ru: '{color} биконусы Preciosa',
    vi: 'hạt bicone Preciosa {color}',
  },
  'materials.additional_bead.swarovski_bicones': {
    en: 'Swarovski {color} bicones',
    ru: '{color} биконусы Swarovski',
    vi: 'hạt bicone Swarovski {color}',
  },
  'materials.additional_bead.basic_beads': {
    en: 'basic {color} beads',
    ru: 'простые {color} бусины',
    vi: 'hạt cơ bản {color}',
  },
  // Приписки у брендовых бусин
  'materials.additional_bead_note.preciosa_bicones': {
    en: 'fine Czech crystal',
    ru: 'качественный чешский хрусталь',
    vi: 'pha lê Séc chất lượng cao',
  },
  'materials.additional_bead_note.swarovski_bicones': {
    en: 'Austrian crystal with exceptional sparkle',
    ru: 'австрийский хрусталь с исключительным блеском',
    vi: 'pha lê Áo lấp lánh vượt trội',
  },
  // Две разные бусины — одной строкой: «Basic pale beads and unbranded crystal bicones»
  'materials.and': {
    en: 'and',
    ru: 'и',
    vi: 'và',
  },
  // Цвета бусин (ADDITIONAL_BEAD_COLORS в scripts/data-rules.mjs). ru — во множественном числе, как в «чёрные биконусы»
  'materials.color.crystal': {
    en: 'crystal',
    ru: 'прозрачные',
    vi: 'trong suốt',
  },
  'materials.color.pale': {
    en: 'pale',
    ru: 'бледные',
    vi: 'màu nhạt',
  },
  'materials.color.white': {
    en: 'white',
    ru: 'белые',
    vi: 'màu trắng',
  },
  'materials.color.black': {
    en: 'black',
    ru: 'чёрные',
    vi: 'màu đen',
  },
  'materials.color.red': {
    en: 'red',
    ru: 'красные',
    vi: 'màu đỏ',
  },
  'materials.color.pink': {
    en: 'pink',
    ru: 'розовые',
    vi: 'màu hồng',
  },
  'materials.color.orange': {
    en: 'orange',
    ru: 'оранжевые',
    vi: 'màu cam',
  },
  'materials.color.yellow': {
    en: 'yellow',
    ru: 'жёлтые',
    vi: 'màu vàng',
  },
  'materials.color.green': {
    en: 'green',
    ru: 'зелёные',
    vi: 'màu xanh lá',
  },
  'materials.color.light-blue': {
    en: 'light blue',
    ru: 'голубые',
    vi: 'màu xanh nhạt',
  },
  'materials.color.blue': {
    en: 'blue',
    ru: 'синие',
    vi: 'màu xanh dương',
  },
  'materials.color.purple': {
    en: 'purple',
    ru: 'фиолетовые',
    vi: 'màu tím',
  },
  'materials.color.brown': {
    en: 'brown',
    ru: 'коричневые',
    vi: 'màu nâu',
  },
  'materials.color.gold': {
    en: 'gold',
    ru: 'золотистые',
    vi: 'màu vàng kim',
  },
  'materials.color.silver': {
    en: 'silver',
    ru: 'серебристые',
    vi: 'màu bạc',
  },
  // Приписки к ниткам (materials.threads): названия не переводятся
  'materials.thread_note.fireline': {
    en: 'ultra-strong American polyethylene thread',
    ru: 'сверхпрочная американская полиэтиленовая нить',
    vi: 'chỉ polyethylene siêu bền của Mỹ',
  },
  'materials.thread_note.miyuki_dura_line': {
    en: 'ultra-strong Japanese polyethylene thread',
    ru: 'сверхпрочная японская полиэтиленовая нить',
    vi: 'chỉ polyethylene siêu bền của Nhật Bản',
  },
  'materials.thread_note.wildfire': {
    en: 'US-made polyethylene beading thread',
    ru: 'американская полиэтиленовая нить для бисероплетения',
    vi: 'chỉ polyethylene xâu hạt sản xuất tại Mỹ',
  },
  'materials.thread_note.toho_one_g': {
    en: 'premium Japanese nylon beading thread',
    ru: 'премиальная японская нейлоновая нить для бисероплетения',
    vi: 'chỉ nylon xâu hạt cao cấp của Nhật Bản',
  },
  'materials.thread_note.miyuki': {
    en: 'durable Japanese nylon beading thread',
    ru: 'прочная японская нейлоновая нить для бисероплетения',
    vi: 'chỉ nylon xâu hạt bền chắc của Nhật Bản',
  },
  'materials.thread_note.fgb': {
    en: 'durable Chinese nylon beading thread',
    ru: 'прочная китайская нейлоновая нить для бисероплетения',
    vi: 'chỉ nylon xâu hạt bền chắc của Trung Quốc',
  },
  // Фурнитура брелка (CHARM_FINDINGS в scripts/data-rules.mjs)
  'materials.charm_finding.keyring': {
    en: 'Basic keyring',
    ru: 'Простое кольцо с цепочкой для ключей',
    vi: 'Móc khóa cơ bản',
  },
  'materials.charm_finding.charm_strap': {
    en: 'Basic charm strap',
    ru: 'Базовая петелька для телефона',
    vi: 'Dây đeo điện thoại cơ bản',
  },
  'materials.charm_finding.large_lobster_clasp': {
    en: 'Large lobster clasp',
    ru: 'Большой карабин для сумки',
    vi: 'Móc càng cua cỡ lớn',
  },
  'materials.charm_finding.hanging_strap': {
    en: 'Basic hanging strap',
    ru: 'Простой шнурок для подвеса',
    vi: 'Dây treo cơ bản',
  },
  // Фурнитура браслета — одним предложением: группы «бренд + металл» через «; ». {brand} — бренд жирным,
  // {parts} — детали через запятую, {metal} — металл (без бренда — нержавеющая сталь, жирным). ru — металл в
  // родительном падеже («из латуни…»). Первое слово сайт делает заглавным
  'materials.findings_branded': {
    en: '{metal} {parts} from {brand}',
    ru: '{parts} из {metal} от {brand}',
    vi: '{parts} {metal} của {brand}',
  },
  'materials.findings_basic': {
    en: 'basic {metal} {parts}',
    ru: '{parts} из {metal}',
    vi: '{parts} bằng {metal}',
  },
  'materials.part.slideTubes': {
    en: 'slide tubes',
    ru: 'концевики-трубочки',
    vi: 'kẹp đầu dạng ống',
  },
  'materials.part.beadEndings': {
    en: 'bead endings',
    ru: 'концевики',
    vi: 'đầu chặn hạt',
  },
  'materials.part.chain': {
    en: 'chain',
    ru: 'цепочка',
    vi: 'dây xích',
  },
  'materials.part.adjustableChain': {
    en: 'adjustable chain',
    ru: 'цепочка с бегунком',
    vi: 'dây xích điều chỉnh',
  },
  'materials.part.lobsterClasp': {
    en: 'lobster clasp',
    ru: 'замок-карабин',
    vi: 'khóa càng cua',
  },
  'materials.part.magneticClasp': {
    en: 'magnetic clasp',
    ru: 'магнитный замок',
    vi: 'khóa nam châm',
  },
  'materials.part.connectorRings': {
    en: 'connector rings',
    ru: 'соединительные колечки',
    vi: 'khoen nối',
  },
  'materials.metal.rhodium': {
    en: 'rhodium-plated brass',
    ru: 'латуни с родиевым покрытием',
    vi: 'đồng thau mạ rhodium',
  },
  'materials.metal.gold18': {
    en: '18K gold-plated brass',
    ru: 'латуни с покрытием золотом 18K',
    vi: 'đồng thau mạ vàng 18K',
  },
  'materials.metal.gold24': {
    en: '24K gold-plated brass',
    ru: 'латуни с покрытием золотом 24K',
    vi: 'đồng thau mạ vàng 24K',
  },
  'materials.metal.stainless': {
    en: 'stainless steel',
    ru: 'нержавеющей стали',
    vi: 'thép không gỉ',
  },
  'materials.metal.zamacAntiqueSilver': {
    en: 'antique silver-plated zamac',
    ru: 'замака с покрытием под состаренное серебро',
    vi: 'hợp kim zamac mạ bạc cổ',
  },
  'materials.metal.zamacGold24': {
    en: '24K gold-plated zamac',
    ru: 'замака с покрытием золотом 24K',
    vi: 'hợp kim zamac mạ vàng 24K',
  },
  // Вместо цветов бисера, если они секрет автора схемы (colorsPublic: no). {designer} — автор схемы из credits.designer
  'materials.colors_secret': {
    en: 'The bead palette for this pattern isn’t disclosed — it’s part of a paid design by {designer}. Only the buyer will find it on the enclosed card.',
    ru: 'Подбор бисера для этой схемы не разглашается — это часть платного дизайна от {designer}. Его увидит только покупатель на вложенной карточке.',
    vi: 'Bảng màu hạt của mẫu này không được tiết lộ — đó là một phần của thiết kế trả phí của {designer}. Chỉ người mua mới thấy được trên tấm thiệp đi kèm.',
  },
  // Под цветами бисера, если оригинальный подбор — часть платной схемы, а бисер заменён своим (colorsPublic: replaced).
  // {designer} — автор схемы из credits.designer
  'materials.colors_replaced': {
    en: 'The original bead palette for this pattern isn’t disclosed — it’s part of a paid design by {designer}, but this is my own color mix.',
    ru: 'Изначальный подбор бисера для этой схемы не разглашается — это часть платного дизайна от {designer}, но здесь мой собственный микс.',
    vi: 'Bảng màu hạt gốc của mẫu này không được tiết lộ — đó là một phần của thiết kế trả phí của {designer}, nhưng đây là bảng màu của riêng mình.',
  },
  // Когда бисера два: {name} — короткое название, «Delica»
  'materials.colors_of': {
    en: '{name} colors:',
    ru: 'Цвета {name}:',
    vi: 'Màu {name}:',
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
  /** Заголовок над аккордеоном на странице товара (размер, материалы, застёжка, уход, авторы) */
  'catalog.good_to_know': {
    en: 'Good to know',
    ru: 'Полезно знать',
    vi: 'Điều bạn nên biết',
  },
  // Разделы аккордеона на странице брелка (category: charm): сменное крепление, прочность и уход
  'catalog.charm_attachment.title': {
    en: 'Phone, keys or bag',
    ru: 'Крепление можно поменять',
    vi: 'Có thể đổi móc gắn',
  },
  'catalog.charm_attachment.text': {
    en: `
      <p>Along with my pieces, I leave a little box of spare parts in partner shops: rings with chains for keys, loops for phones and lobster clasps for bags. If the way the charm hangs in the photos doesn’t work for you, just tell the staff and they’ll swap it on the spot. When ordering online, <a class="link" href="/contacts" data-hystmodal="#modal-contact" data-modal-always>mention in the chat</a> how you’d like to wear it.</p>
      <p>Just keep the size of the charm in mind: a small one can get lost on a big bag, while a large one may get in the way on a phone or a bunch of keys. There’s a bottle cap in the photos for scale.</p>
    `,
    ru: `
      <p>Вместе с&nbsp;изделиями я&nbsp;оставляю в&nbsp;партнёрских магазинах коробочку с&nbsp;запчастями: кольца с&nbsp;цепочкой&nbsp;— для ключей, петельки&nbsp;— для телефона, карабины&nbsp;— для сумки. Если крепление на&nbsp;фото вам не&nbsp;подходит, скажите об&nbsp;этом в&nbsp;магазине, и&nbsp;его поменяют на&nbsp;месте. При заказе онлайн просто <a class="link" href="/ru/contacts" data-hystmodal="#modal-contact" data-modal-always>напишите в&nbsp;чате</a>, какое крепление хотите.</p>
      <p>Только учитывайте размер брелка: маленький может потеряться на&nbsp;большой сумке, а&nbsp;крупный будет мешать на&nbsp;телефоне или связке ключей. Чтобы размер было проще представить, на&nbsp;фото рядом лежит крышечка от&nbsp;бутылки.</p>
    `,
    vi: `
      <p>Mỗi lần giao hàng, mình đều để lại ở cửa hàng đối tác một hộp phụ kiện nhỏ: khoen kèm dây xích để treo chìa khóa, dây đeo cho điện thoại và móc càng cua để treo lên túi xách. Nếu kiểu móc gắn trong ảnh chưa hợp với bạn, cứ nói với nhân viên, họ sẽ đổi ngay tại chỗ. Khi đặt hàng online, <a class="link" href="/vi/contacts" data-hystmodal="#modal-contact" data-modal-always>hãy nhắn trong chat</a> nếu bạn muốn đổi móc gắn.</p>
      <p>Chỉ cần lưu ý kích thước sản phẩm: charm nhỏ dễ bị lọt thỏm trên túi lớn, còn charm to có thể vướng víu khi treo điện thoại hay chùm chìa khóa. Trong ảnh có đặt kèm một chiếc nắp chai để bạn dễ hình dung.</p>
    `,
  },
  // Раздел аккордеона на странице браслета: какие бывают застёжки (src/components/BraceletClasps). Фото — public/images/clasps
  'catalog.clasps.title': {
    en: 'Clasp options',
    ru: 'Застёжку можно поменять',
    vi: 'Có thể đổi khóa',
  },
  // Вступление: у браслета с цепочкой (chain) — абзац про трюк с невидимкой (фото bobby-pin, подпись в лайтбоксе — bobby_pin);
  // у всех — swap, как запасные крепления у брелков (catalog.charm_attachment.text)
  'catalog.clasps.chain': {
    en: '<strong>A chain with a lobster clasp</strong> is the standard for bracelets, but it’s quite tricky to fasten with just one free hand. Remember this bobby pin trick (I’ll put a pin in the box). Even so, it takes some practice, so if the length works out, the clasp can be swapped.',
    ru: '<strong>Цепочка с&nbsp;карабином</strong>&nbsp;— стандарт для браслетов, но&nbsp;застегнуть её одной свободной рукой довольно сложно. Запомните этот трюк с&nbsp;невидимкой (я&nbsp;вложу её в&nbsp;коробку). Но&nbsp;даже с&nbsp;ним нужна сноровка, так что, если длина подходит, застёжку можно поменять.',
    vi: '<strong>Xích kèm khóa tôm</strong> là kiểu khóa tiêu chuẩn của vòng tay, nhưng tự cài bằng một tay khá khó. Hãy nhớ mẹo dùng kẹp tăm này nhé (mình sẽ để sẵn một chiếc trong hộp). Dù vậy, vẫn cần chút khéo tay, nên nếu độ dài phù hợp, bạn có thể đổi khóa.',
  },
  'catalog.clasps.swap': {
    en: 'Along with my bracelets, I leave spare clasps in partner shops. If the clasp in the photos doesn’t work for you, just tell the staff and they’ll swap it on the spot — the design usually allows it. When ordering online, <a class="link" href="/contacts" data-hystmodal="#modal-contact" data-modal-always>mention in the chat</a> which clasp you’d like. Here are the options:',
    ru: 'Вместе с браслетами я оставляю в партнёрских магазинах запасные застёжки. Если застёжка на фото вам не подходит, скажите об этом в магазине, и её поменяют на месте: обычно дизайн позволяет это сделать. При заказе онлайн просто <a class="link" href="/ru/contacts" data-hystmodal="#modal-contact" data-modal-always>напишите в чате</a>, какую застёжку хотите. Вот какие они бывают:',
    vi: 'Cùng với vòng tay, mình để lại ở cửa hàng đối tác vài kiểu khóa dự phòng. Nếu khóa trong ảnh chưa hợp với bạn, cứ nói với nhân viên, họ sẽ đổi ngay tại chỗ — thường thì thiết kế của vòng cho phép làm vậy. Khi đặt hàng online, <a class="link" href="/vi/contacts" data-hystmodal="#modal-contact" data-modal-always>hãy nhắn trong chat</a> kiểu khóa bạn muốn. Dưới đây là các lựa chọn:',
  },
  'catalog.clasps.bobby_pin': {
    en: 'Anchor the chain with a bobby pin to help clasp it solo (see photo).',
    ru: 'Чтобы застегнуть цепочку самостоятельно, закрепите её конец невидимкой (см. фото).',
    vi: 'Kẹp đầu xích bằng một chiếc kẹp tăm để dễ tự cài hơn (xem ảnh).',
  },
  'catalog.clasps.current': {
    en: 'On this bracelet',
    ru: 'На этом браслете',
    vi: 'Trên chiếc vòng này',
  },
  'catalog.clasps.lobster.title': {
    en: 'Lobster clasp with extender chain',
    ru: 'Карабин с цепочкой-удлинителем',
    vi: 'Khóa tôm và xích nối dài',
  },
  'catalog.clasps.lobster.text': {
    en: 'Adjustable to most wrists and stays secure once fastened. It can be tricky to close single-handed, though.',
    ru: 'Подходит для большинства запястий и надёжно держится, когда застёгнут. Правда, застегнуть его одной рукой бывает непросто.',
    vi: 'Điều chỉnh vừa hầu hết cổ tay và giữ chắc khi đã cài. Có điều hơi khó tự cài bằng một tay.',
  },
  'catalog.clasps.sliding.title': {
    en: 'Sliding adjustable chain',
    ru: 'Цепочка с бегунком',
    vi: 'Xích có hạt trượt',
  },
  'catalog.clasps.sliding.text': {
    en: 'Size-adjustable as well. Easy to put on solo. However, it requires periodic tightening, and the dangling parts can get in the way.',
    ru: 'Тоже регулируется по размеру, и её легко надеть самостоятельно. Но время от времени её нужно подтягивать, а свисающие кончики могут мешать.',
    vi: 'Cũng điều chỉnh được kích cỡ và dễ tự đeo. Tuy vậy, thỉnh thoảng cần kéo chặt lại, và phần dây lủng lẳng có thể hơi vướng.',
  },
  'catalog.clasps.magnetic.title': {
    en: 'Magnetic clasp',
    ru: 'Магнитный замок',
    vi: 'Khóa nam châm',
  },
  'catalog.clasps.magnetic.text': {
    en: 'Minimalist, easy magnetic snap-on. No periodic tightening needed. Fixed size, though — it must fit your wrist as-is, with no room for adjustments.',
    ru: 'Минималистичный, легко защёлкивается магнитом, подтягивать не нужно. Но размер фиксированный — браслет должен сразу подойти к запястью, подогнать его не получится.',
    vi: 'Tối giản, cài bằng nam châm rất dễ, không cần kéo chặt lại. Có điều kích cỡ cố định — vòng phải vừa sẵn với cổ tay, không chỉnh được.',
  },
  'catalog.clasps.beaded.title': {
    en: 'Beaded toggle, metal-free',
    ru: 'Бисерная застёжка без металла',
    vi: 'Khóa đan bằng hạt, không kim loại',
  },
  'catalog.clasps.beaded.text': {
    en: 'Ideal for metal allergies. Seamless all-bead look. It does, though, require a custom pattern rework. May not work with certain designs. Fixed size.',
    ru: 'Идеально при аллергии на металл, и выглядит цельно — только бисер. Но под неё нужно переделать схему, и подходит она не ко всем дизайнам. Размер фиксированный.',
    vi: 'Lý tưởng cho người dị ứng kim loại, trông liền mạch, toàn bằng hạt. Có điều cần chỉnh lại mẫu đan riêng và có thể không hợp với một số thiết kế. Kích cỡ cố định.',
  },
  // Прочность и уход — раздел аккордеона на странице товара, свой текст у каждой категории: catalog.care.<category>
  'catalog.care.title': {
    en: 'Durability & care',
    ru: 'Прочность и уход',
    vi: 'Độ bền và bảo quản',
  },
  'catalog.care.charm': {
    en: `
      <p>I use seed beads of exceptional quality, but they are still glass, often with decorative finishes. Here’s what to expect:</p>
      <ul>
        <li><strong>As a keychain:</strong> expect wear from constant knocks. With a small set of keys it can last for years, but heavy bunches or a motorbike key greatly increase the risk of beads breaking.</li>
        <li><strong>As a phone charm:</strong> constant friction in pockets and bags is a harsh environment. Some finishes (mostly metallic) may wear off over time, and lighter colors may pick up dirt.</li>
        <li><strong>As a bag or backpack charm:</strong> long exposure to direct sunlight may make some colors fade.</li>
      </ul>
      <p>Despite all this, don’t be afraid to enjoy your charm! It was made to live an everyday life and wear its little scars. Some wear is inevitable — it’s part of its journey as your daily companion, and no reason not to use it with pleasure.</p>
    `,
    ru: `
      <p>Я&nbsp;использую бисер исключительного качества, но&nbsp;это всё равно стекло, часто с&nbsp;декоративным покрытием. Вот чего стоит ожидать:</p>
      <ul>
        <li><strong>На&nbsp;ключах:</strong> брелок изнашивается от&nbsp;постоянных ударов. С&nbsp;небольшой связкой он&nbsp;прослужит годы, а&nbsp;с&nbsp;тяжёлой связкой или на&nbsp;ключе от&nbsp;мотобайка риск, что бисерины треснут, гораздо выше.</li>
        <li><strong>На&nbsp;телефоне:</strong> постоянное трение в&nbsp;кармане или сумке&nbsp;— суровые условия. Некоторые покрытия (в&nbsp;основном металлизированные) со&nbsp;временем могут стереться, а&nbsp;светлые цвета&nbsp;— загрязниться.</li>
        <li><strong>На&nbsp;сумке или рюкзаке:</strong> от&nbsp;долгого прямого солнца некоторые цвета могут выгореть.</li>
      </ul>
      <p>Несмотря на&nbsp;всё это, не&nbsp;бойтесь носить брелок! Он&nbsp;сделан, чтобы жить обычной жизнью и&nbsp;собирать следы ежедневного использования. Небольшой износ неизбежен&nbsp;— это часть его пути как вашего спутника на&nbsp;каждый день и&nbsp;не&nbsp;повод отказываться от&nbsp;удовольствия его носить.</p>
    `,
    vi: `
      <p>Mình dùng hạt cườm chất lượng rất cao, nhưng đó vẫn là thủy tinh, thường có lớp phủ trang trí. Đây là những điều bạn nên biết:</p>
      <ul>
        <li><strong>Treo chìa khóa:</strong> charm sẽ bị mòn do va chạm liên tục. Với vài chiếc chìa nhỏ, charm có thể bền nhiều năm, nhưng nếu treo chùm chìa nặng hoặc chìa khóa xe máy thì nguy cơ hạt bị vỡ cao hơn nhiều.</li>
        <li><strong>Treo điện thoại:</strong> ma sát liên tục trong túi quần hay túi xách khá khắc nghiệt. Một số lớp phủ (chủ yếu là ánh kim) có thể bong dần, và màu sáng có thể bị bám bẩn theo thời gian.</li>
        <li><strong>Treo túi xách hoặc ba lô:</strong> phơi nắng trực tiếp lâu ngày có thể làm một số màu bị phai.</li>
      </ul>
      <p>Dù vậy, bạn đừng ngại dùng charm nhé! Nó được làm ra để theo bạn mỗi ngày và mang những dấu vết của cuộc sống thường ngày. Hao mòn một chút là điều khó tránh — đó cũng là một phần hành trình của người bạn đồng hành này, và không phải lý do để bạn bớt vui khi dùng nó.</p>
    `,
  },
  'catalog.care.bracelet': {
    en: `
      <ul>
        <li><strong>Avoid chemicals:</strong> Minimize contact with perfumes, hairsprays, and lotions to preserve the finish and shine.</li>
        <li><strong>Keep it dry:</strong> Slide the bracelet up while washing hands. Take it off before workouts or chores to avoid sweat and cleaning products.</li>
        <li><strong>Storage:</strong> For long-term storage, seal it airtight with the provided anti-tarnish strip to protect metal parts and metallic beads from oxidation. In humid climates, also add the included silica gel.</li>
        <li><strong>Handle with care:</strong> Although I use seed beads of exceptional quality, they are made of glass. Do not place heavy objects on top. Avoid tossing it loose with keys, coins, and other hard items.</li>
      </ul>
    `,
    ru: `
      <ul>
        <li><strong>Без химии:</strong> старайтесь, чтобы на&nbsp;браслет поменьше попадали духи, лак для волос и&nbsp;лосьоны,&nbsp;— так покрытие и&nbsp;блеск сохранятся дольше.</li>
        <li><strong>Держите сухим:</strong> когда моете руки, сдвигайте браслет повыше. Снимайте его перед тренировкой или уборкой, чтобы на&nbsp;него не&nbsp;попадали пот и&nbsp;чистящие средства.</li>
        <li><strong>Хранение:</strong> если убираете изделие надолго, положите его в&nbsp;герметичный пакет вместе с&nbsp;полоской от&nbsp;потускнения из&nbsp;комплекта&nbsp;— она защитит металлические детали и&nbsp;металлизированный бисер от&nbsp;окисления. Во&nbsp;влажном климате добавьте и&nbsp;силикагель из&nbsp;комплекта.</li>
        <li><strong>Бережно:</strong> я&nbsp;использую бисер исключительного качества, но&nbsp;это стекло. Не&nbsp;кладите на&nbsp;браслет тяжёлое и&nbsp;не бросайте его вперемешку с&nbsp;ключами, монетами и&nbsp;другими твёрдыми предметами.</li>
      </ul>
    `,
    vi: `
      <ul>
        <li><strong>Tránh hóa chất:</strong> hạn chế để vòng tiếp xúc với nước hoa, keo xịt tóc và kem dưỡng để giữ lớp phủ và độ bóng.</li>
        <li><strong>Giữ khô ráo:</strong> kéo vòng lên cao khi rửa tay. Tháo vòng ra trước khi tập thể dục hoặc làm việc nhà để tránh mồ hôi và chất tẩy rửa.</li>
        <li><strong>Cất giữ:</strong> khi cất lâu ngày, hãy cho sản phẩm vào túi kín cùng miếng chống xỉn màu đi kèm để bảo vệ các chi tiết kim loại và hạt ánh kim khỏi bị oxy hóa. Ở nơi khí hậu ẩm, cho thêm gói hút ẩm đi kèm.</li>
        <li><strong>Nhẹ tay:</strong> dù mình dùng hạt cườm chất lượng rất cao, chúng vẫn là thủy tinh. Đừng đặt vật nặng lên vòng, cũng đừng để vòng lẫn lộn với chìa khóa, tiền xu và các vật cứng khác.</li>
      </ul>
    `,
  },
  'catalog.care.ring': {
    en: `
      <ul>
        <li><strong>Keep it dry:</strong> Remove before washing hands, showering, or swimming to preserve color vibrancy.</li>
        <li><strong>Avoid chemicals:</strong> Minimize contact with hand soaps, sanitizers, and lotions to preserve the finish and shine, and keep residue from building up between beads.</li>
        <li><strong>Handle with care:</strong> Take it off before workouts, chores, or handling hard items and heavy bags to prevent crushing the glass beads.</li>
        <li><strong>Roll, don't pull:</strong> Gently roll the ring over your knuckle when putting it on or taking it off to protect thread tension.</li>
      </ul>
      <p>Despite the warnings, don’t be afraid to live in your ring! Constant friction means some natural wear is expected, but that’s part of its story—just like getting it wet or messy with food once in a while. Wear it with joy!</p>
    `,
    ru: `
      <ul>
        <li><strong>Держите сухим:</strong> снимайте кольцо, когда моете руки, принимаете душ или плаваете,&nbsp;— так цвета дольше останутся яркими.</li>
        <li><strong>Без химии:</strong> старайтесь, чтобы на&nbsp;кольцо поменьше попадали мыло, антисептики и&nbsp;лосьоны,&nbsp;— так сохранятся покрытие и&nbsp;блеск, а&nbsp;между бисеринами не&nbsp;будет скапливаться налёт.</li>
        <li><strong>Бережно:</strong> снимайте кольцо перед тренировкой, уборкой, а&nbsp;также когда берёте в&nbsp;руки твёрдые предметы и&nbsp;тяжёлые сумки,&nbsp;— иначе стеклянный бисер может треснуть.</li>
        <li><strong>Скатывайте, а&nbsp;не тяните:</strong> надевая и&nbsp;снимая кольцо, аккуратно прокатывайте его через сустав&nbsp;— так нить не&nbsp;растянется.</li>
      </ul>
      <p>Несмотря на&nbsp;все предупреждения, не&nbsp;бойтесь носить кольцо каждый день! От&nbsp;постоянного трения небольшой износ неизбежен, но&nbsp;это часть его истории&nbsp;— как и&nbsp;то, что иногда оно намокнет или испачкается едой. Носите с&nbsp;радостью!</p>
    `,
    vi: `
      <ul>
        <li><strong>Giữ khô ráo:</strong> tháo nhẫn ra khi rửa tay, tắm hoặc đi bơi để màu sắc luôn tươi.</li>
        <li><strong>Tránh hóa chất:</strong> hạn chế để nhẫn tiếp xúc với xà phòng, nước rửa tay khô và kem dưỡng để giữ lớp phủ và độ bóng, đồng thời tránh cặn bám giữa các hạt.</li>
        <li><strong>Nhẹ tay:</strong> tháo nhẫn ra trước khi tập thể dục, làm việc nhà, cầm vật cứng hay xách túi nặng để hạt thủy tinh không bị vỡ.</li>
        <li><strong>Lăn, đừng kéo:</strong> khi đeo hoặc tháo, hãy nhẹ nhàng lăn nhẫn qua khớp ngón tay để giữ độ căng của chỉ.</li>
      </ul>
      <p>Dù có những lưu ý trên, bạn cứ thoải mái đeo nhẫn mỗi ngày nhé! Ma sát liên tục sẽ khiến nhẫn mòn đi đôi chút, nhưng đó là một phần câu chuyện của nó — cũng như thỉnh thoảng bị ướt hay dính chút đồ ăn. Hãy đeo thật vui!</p>
    `,
  },
  'catalog.care.pen-wrap': {
    en: `
      <ul>
        <li><strong>Cosmetic residues:</strong> Direct contact with freshly moisturized hands can wear down bead coatings over time. Allow lotions, creams, and sanitizers to dry before use to preserve the finish and shine.</li>
        <li><strong>Storage:</strong> For long-term storage, seal it airtight with the provided anti-tarnish strip to protect metallic beads from oxidation. In humid climates, also add the included silica gel.</li>
        <li><strong>Pencil case and carry:</strong> Tumbling loosely in a bag or pencil case alongside heavy or sharp objects like coins, keys, and metal sharpeners can chip or break a few beads.</li>
      </ul>
      <p>Despite the warnings, don’t be afraid to put your pen to work! Some natural wear is expected and simply part of its story. Plus, pens live a far gentler life than, say, keychains or phone charms. Write with joy!</p>
    `,
    ru: `
      <ul>
        <li><strong>Косметика:</strong> от&nbsp;прямого контакта со&nbsp;свежими кремами покрытие бисера со&nbsp;временем стирается. Дайте лосьону, крему или антисептику впитаться, прежде чем брать ручку,&nbsp;— так покрытие и&nbsp;блеск сохранятся дольше.</li>
        <li><strong>Хранение:</strong> если убираете изделие надолго, положите его в&nbsp;герметичный пакет вместе с&nbsp;полоской от&nbsp;потускнения из&nbsp;комплекта&nbsp;— она защитит металлизированный бисер от&nbsp;окисления. Во&nbsp;влажном климате добавьте и&nbsp;силикагель из&nbsp;комплекта.</li>
        <li><strong>Пенал и&nbsp;сумка:</strong> если ручка болтается в&nbsp;сумке или пенале рядом с&nbsp;тяжёлыми или острыми предметами&nbsp;— монетами, ключами, металлическими точилками,&nbsp;— несколько бисерин могут отколоться или треснуть.</li>
      </ul>
      <p>Несмотря на&nbsp;все предупреждения, не&nbsp;бойтесь пользоваться ручкой! Небольшой износ неизбежен, и&nbsp;это просто часть её&nbsp;истории. К&nbsp;тому же&nbsp;у ручки жизнь куда спокойнее, чем, скажем, у&nbsp;брелка на&nbsp;ключах или телефоне. Пишите с&nbsp;радостью!</p>
    `,
    vi: `
      <ul>
        <li><strong>Mỹ phẩm:</strong> tiếp xúc trực tiếp với tay vừa thoa kem có thể làm mòn lớp phủ của hạt theo thời gian. Hãy đợi kem dưỡng, kem bôi hay nước rửa tay khô khô hẳn rồi mới dùng bút để giữ lớp phủ và độ bóng.</li>
        <li><strong>Cất giữ:</strong> khi cất lâu ngày, hãy cho sản phẩm vào túi kín cùng miếng chống xỉn màu đi kèm để bảo vệ hạt ánh kim khỏi bị oxy hóa. Ở nơi khí hậu ẩm, cho thêm gói hút ẩm đi kèm.</li>
        <li><strong>Hộp bút và túi xách:</strong> để bút lăn lóc trong túi hay hộp bút cùng vật nặng hoặc sắc như tiền xu, chìa khóa, gọt bút chì kim loại có thể làm mẻ hoặc vỡ vài hạt.</li>
      </ul>
      <p>Dù có những lưu ý trên, bạn cứ thoải mái dùng bút nhé! Mòn đi đôi chút là chuyện tự nhiên và cũng là một phần câu chuyện của nó. Hơn nữa, bút sống nhẹ nhàng hơn nhiều so với charm treo chìa khóa hay điện thoại. Hãy viết thật vui!</p>
    `,
  },
  'catalog.care.earrings': {
    en: `
      <ul>
        <li><strong>Avoid chemicals:</strong> Minimize contact with perfumes, hairsprays, and lotions to preserve the finish and shine.</li>
        <li><strong>Keep them dry:</strong> Remove before showering, workouts, or saunas to avoid sweat, steam, and soap.</li>
        <li><strong>Storage:</strong> For long-term storage, seal them airtight with the provided anti-tarnish strip to protect metallic beads from oxidation. In humid climates, also add the included silica gel.</li>
        <li><strong>Sleep & clothes:</strong> Remove before sleeping, and take care when dressing, undressing, or wearing scarves. Earrings can catch on loose knits, risking ear irritation and bent findings.</li>
      </ul>
    `,
    ru: `
      <ul>
        <li><strong>Без химии:</strong> старайтесь, чтобы на&nbsp;серьги поменьше попадали духи, лак для волос и&nbsp;лосьоны,&nbsp;— так покрытие и&nbsp;блеск сохранятся дольше.</li>
        <li><strong>Держите сухими:</strong> снимайте серьги перед душем, тренировкой или сауной, чтобы на&nbsp;них не&nbsp;попадали пот, пар и&nbsp;мыло.</li>
        <li><strong>Хранение:</strong> если убираете изделие надолго, положите его в&nbsp;герметичный пакет вместе с&nbsp;полоской от&nbsp;потускнения из&nbsp;комплекта&nbsp;— она защитит металлизированный бисер от&nbsp;окисления. Во&nbsp;влажном климате добавьте и&nbsp;силикагель из&nbsp;комплекта.</li>
        <li><strong>Сон и&nbsp;одежда:</strong> снимайте серьги перед сном и&nbsp;будьте аккуратнее, когда одеваетесь, раздеваетесь или носите шарф: серьги могут зацепиться за&nbsp;крупную вязку&nbsp;— так можно поранить ухо и&nbsp;погнуть фурнитуру.</li>
      </ul>
    `,
    vi: `
      <ul>
        <li><strong>Tránh hóa chất:</strong> hạn chế để bông tai tiếp xúc với nước hoa, keo xịt tóc và kem dưỡng để giữ lớp phủ và độ bóng.</li>
        <li><strong>Giữ khô ráo:</strong> tháo bông tai ra trước khi tắm, tập thể dục hoặc xông hơi để tránh mồ hôi, hơi nước và xà phòng.</li>
        <li><strong>Cất giữ:</strong> khi cất lâu ngày, hãy cho sản phẩm vào túi kín cùng miếng chống xỉn màu đi kèm để bảo vệ hạt ánh kim khỏi bị oxy hóa. Ở nơi khí hậu ẩm, cho thêm gói hút ẩm đi kèm.</li>
        <li><strong>Khi ngủ và thay đồ:</strong> tháo bông tai trước khi ngủ, và cẩn thận khi mặc, cởi đồ hay quàng khăn. Bông tai có thể vướng vào vải đan thưa, dễ làm tai bị kích ứng và móc bị cong.</li>
      </ul>
    `,
  },
  // Предостережения — отдельный раздел аккордеона после «Прочность и уход»: catalog.warnings.<category>, {age} — siteSettings.ageLimit
  'catalog.warnings.title': {
    en: 'Safety notes',
    ru: 'Предостережения',
    vi: 'Lưu ý an toàn',
  },
  'catalog.warnings.charm': {
    en: `
      <ul>
        <li>Every piece is handmade, so small irregularities are to be expected.</li>
        <li>Choking hazard due to small parts. Suitable for ages {age} and up. Adult supervision recommended.</li>
      </ul>
    `,
    ru: `
      <ul>
        <li>Каждое изделие сделано вручную, так что небольшие неровности возможны.</li>
        <li>Есть мелкие детали, которые можно случайно проглотить, поэтому детям&nbsp;— только с&nbsp;{age}&nbsp;лет и&nbsp;под присмотром взрослых.</li>
      </ul>
    `,
    vi: `
      <ul>
        <li>Mỗi sản phẩm đều làm thủ công nên có thể có vài điểm chưa đều.</li>
        <li>Có chi tiết nhỏ, nguy cơ hóc nghẹt. Phù hợp cho trẻ từ {age} tuổi trở lên, nên có người lớn giám sát.</li>
      </ul>
    `,
  },
  'catalog.warnings.bracelet': {
    en: `
      <ul>
        <li>Please note this is a handmade item — some irregularities are to be expected.</li>
        <li>Metal parts may cause skin reactions for some. <a class="link" href="/contacts" data-hystmodal="#modal-contact" data-modal-always>Contact me</a>; I may be able to redesign the piece to be metal-free.</li>
        <li>Choking hazard due to small parts. Suitable for ages {age} and up. Adult supervision recommended.</li>
      </ul>
    `,
    ru: `
      <ul>
        <li>Это изделие ручной работы, так что небольшие неровности возможны.</li>
        <li>У&nbsp;некоторых людей металлические детали вызывают раздражение кожи. <a class="link" href="/ru/contacts" data-hystmodal="#modal-contact" data-modal-always>Напишите мне</a>&nbsp;— возможно, браслет получится переделать без металла.</li>
        <li>Есть мелкие детали, которые можно случайно проглотить, поэтому детям&nbsp;— только с&nbsp;{age}&nbsp;лет и&nbsp;под присмотром взрослых.</li>
      </ul>
    `,
    vi: `
      <ul>
        <li>Đây là sản phẩm làm thủ công nên có thể có vài điểm chưa đều.</li>
        <li>Chi tiết kim loại có thể gây kích ứng da ở một số người. <a class="link" href="/vi/contacts" data-hystmodal="#modal-contact" data-modal-always>Hãy liên hệ với mình</a> — có thể mình sẽ làm lại vòng mà không dùng kim loại.</li>
        <li>Có chi tiết nhỏ, nguy cơ hóc nghẹt. Phù hợp cho trẻ từ {age} tuổi trở lên, nên có người lớn giám sát.</li>
      </ul>
    `,
  },
  'catalog.warnings.ring': {
    en: `
      <ul>
        <li>Please note this is a handmade item — some irregularities are to be expected.</li>
        <li>Choking hazard due to small parts. Suitable for ages {age} and up. Adult supervision recommended.</li>
      </ul>
    `,
    ru: `
      <ul>
        <li>Это изделие ручной работы, так что небольшие неровности возможны.</li>
        <li>Есть мелкие детали, которые можно случайно проглотить, поэтому детям&nbsp;— только с&nbsp;{age}&nbsp;лет и&nbsp;под присмотром взрослых.</li>
      </ul>
    `,
    vi: `
      <ul>
        <li>Đây là sản phẩm làm thủ công nên có thể có vài điểm chưa đều.</li>
        <li>Có chi tiết nhỏ, nguy cơ hóc nghẹt. Phù hợp cho trẻ từ {age} tuổi trở lên, nên có người lớn giám sát.</li>
      </ul>
    `,
  },
  'catalog.warnings.pen-wrap': {
    en: `
      <ul>
        <li>Please note this is a handmade item — some irregularities are to be expected.</li>
        <li>Choking hazard due to small parts. Suitable for ages {age} and up. Adult supervision recommended.</li>
      </ul>
    `,
    ru: `
      <ul>
        <li>Это изделие ручной работы, так что небольшие неровности возможны.</li>
        <li>Есть мелкие детали, которые можно случайно проглотить, поэтому детям&nbsp;— только с&nbsp;{age}&nbsp;лет и&nbsp;под присмотром взрослых.</li>
      </ul>
    `,
    vi: `
      <ul>
        <li>Đây là sản phẩm làm thủ công nên có thể có vài điểm chưa đều.</li>
        <li>Có chi tiết nhỏ, nguy cơ hóc nghẹt. Phù hợp cho trẻ từ {age} tuổi trở lên, nên có người lớn giám sát.</li>
      </ul>
    `,
  },
  'catalog.warnings.earrings': {
    en: `
      <ul>
        <li>Please note this is a handmade item — some irregularities are to be expected.</li>
        <li>Metal ear wires may cause skin reactions for some. <a class="link" href="/contacts" data-hystmodal="#modal-contact" data-modal-always>Contact me</a>; I may be able to swap findings with alternative options.</li>
        <li>Choking hazard due to small parts. Suitable for ages {age} and up. Adult supervision recommended.</li>
      </ul>
    `,
    ru: `
      <ul>
        <li>Это изделие ручной работы, так что небольшие неровности возможны.</li>
        <li>У&nbsp;некоторых людей металлические швензы вызывают раздражение кожи. <a class="link" href="/ru/contacts" data-hystmodal="#modal-contact" data-modal-always>Напишите мне</a>&nbsp;— возможно, получится заменить их&nbsp;другой фурнитурой.</li>
        <li>Есть мелкие детали, которые можно случайно проглотить, поэтому детям&nbsp;— только с&nbsp;{age}&nbsp;лет и&nbsp;под присмотром взрослых.</li>
      </ul>
    `,
    vi: `
      <ul>
        <li>Đây là sản phẩm làm thủ công nên có thể có vài điểm chưa đều.</li>
        <li>Móc tai bằng kim loại có thể gây kích ứng da ở một số người. <a class="link" href="/vi/contacts" data-hystmodal="#modal-contact" data-modal-always>Hãy liên hệ với mình</a> — có thể mình sẽ đổi sang loại móc khác.</li>
        <li>Có chi tiết nhỏ, nguy cơ hóc nghẹt. Phù hợp cho trẻ từ {age} tuổi trở lên, nên có người lớn giám sát.</li>
      </ul>
    `,
  },
  'catalog.credits': {
    en: 'Credits',
    ru: 'Авторы',
    vi: 'Tác giả',
  },
  'catalog.crafted_by': {
    en: 'Crafted by',
    ru: 'Плетение',
    vi: 'Thực hiện',
  },
  'catalog.designed_by': {
    en: 'Designed by',
    ru: 'Дизайн',
    vi: 'Thiết kế',
  },
  'catalog.photo_by': {
    en: 'Photo by',
    ru: 'Фото',
    vi: 'Ảnh',
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
      <p><span class="nobr"><strong>NGÀY&nbsp;MAI</strong></span> is an authentic handmade shop in <span class="nobr">Da&nbsp;Nang</span> with actual shelves you can explore in person. Among indie perfumes, minerals, ceramics, and woodwork, you’ll find my corner as well. Once a week I check with the shop what’s left in stock, and that's when I update the website. And this is what the “last checked” date refers to.</p>
      <p>Beadwork moves at a rather calm pace, so for the first couple of days after an update, <strong>{item}</strong> is almost certainly waiting for you on the shelf. No\u00A0100% guarantee, of course, but <span class="nobr">NGÀY&nbsp;MAI</span> itself is well worth stopping by regardless!</p>
    `,
    ru: `
      <p><span class="nobr"><strong>NGÀY&nbsp;MAI</strong></span>&nbsp;— это магазин аутентичного хендмейда с&nbsp;живой витриной в&nbsp;Дананге. Среди авторских духов, минералов, керамики и&nbsp;дерева расположился и&nbsp;мой уголок. Раз в&nbsp;неделю я&nbsp;сверяю с&nbsp;магазином наличие на&nbsp;стенде и&nbsp;обновляю сайт&nbsp;— это и&nbsp;есть дата проверки.</p>
      <p>Хендмейд продаётся неторопливо, так что в&nbsp;первые дни после проверки <strong>{item}</strong> практически гарантированно на&nbsp;месте и&nbsp;ждёт вас. Без стопроцентной гарантии, конечно, но&nbsp;в&nbsp;любом случае <span class="nobr">NGÀY&nbsp;MAI</span>&nbsp;— это само по&nbsp;себе прекрасное место, куда обязательно стоит заглянуть!</p>
    `,
    vi: `
      <p><span class="nobr"><strong>NGÀY&nbsp;MAI</strong></span> là một tiệm đồ thủ công rất xinh yêu ở <span class="nobr">Đà&nbsp;Nẵng</span>, nơi bạn có thể ghé tận nơi để sờ tận tay, ngắm tận mắt từng món trên kệ. Bên cạnh nước hoa indie, đá thiên nhiên, đồ gốm và đồ gỗ, bạn cũng sẽ thấy một góc nhỏ của tụi mình ở&nbsp;đó.</p>
      <p>Mỗi tuần một lần mình cùng tiệm kiểm lại đồ trên kệ rồi mới cập nhật lên web&nbsp;— số lượng và ngày “kiểm tra” bạn thấy chính là từ lần đếm gần nhất&nbsp;đó.</p>
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
    en: 'Kindly note: this isn’t a custom order, but a remake along a path I’ve already walked. I can, of course, swap out the clasp or adjust the length, but changing the color palette or reworking the design would be a more involved project.',
    ru: 'Обратите внимание: это не&nbsp;индивидуальный заказ, а&nbsp;повтор по&nbsp;уже протоптанной тропинке. Я, конечно, могу заменить замочек или скорректировать длину, но&nbsp;смена палитры или доработка дизайна&nbsp;— это, пожалуй, отдельная услуга.',
    vi: 'Bạn lưu ý một chút nha: đây là mẫu được làm, chứ không phải đơn đặt làm riêng (custom). Mình hoàn toàn có thể đổi loại móc khóa hoặc chỉnh lại độ dài, nhưng nếu muốn đổi bảng màu hay biến tấu lại thiết kế thì sẽ tốn nhiều công sức hơn hẳn và tính như một đơn đặt riêng nhé.',
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

