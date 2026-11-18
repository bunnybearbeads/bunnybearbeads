import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { LOCATIONS } from './config/locations';

const localizedString = z.object({
  en: z.string(),
  ru: z.string(),
  vi: z.string(),
});

const locationImageSchema = z.union([
  z.string(),
  z.object({
    src: z.string(),
    alt: z.union([z.string(), localizedString]).optional(),
  }),
]);

/**
 * Где лежит вариант. `online` — не место хранения, а признак «можно заказать
 * с доставкой», поэтому количество у него не указывается. Для физических точек
 * (мастерская, витрины партнёров) количество обязательно.
 */
const stockLocationSchema = z
  .object({
    locationId: z.enum(['online', 'dalat', 'ngay-mai', 'cat-food']),
    quantity: z.number().int().nonnegative().optional(),
    /** Код товара в учётной системе партнёра */
    partnerCode: z.string().optional(),
    /** Категория товара у партнёра (может не совпадать с нашей) */
    partnerCategory: z.string().optional(),
    note: localizedString.optional(),
    images: z.array(locationImageSchema).default([]),
  })
  .superRefine((loc, ctx) => {
    const isPartner = LOCATIONS[loc.locationId].type === 'partner';
    if (loc.locationId !== 'online' && loc.quantity === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['quantity'],
        message: `quantity is required for "${loc.locationId}"`,
      });
    }
    if (!isPartner && (loc.partnerCode || loc.partnerCategory)) {
      ctx.addIssue({
        code: 'custom',
        path: ['partnerCode'],
        message: `partnerCode/partnerCategory are only allowed for partner locations, not "${loc.locationId}"`,
      });
    }
  });

const mediaItemSchema = z.union([
  z.string(),
  z.object({
    type: z.enum(['image', 'video']).default('image'),
    src: z.string(),
    poster: z.string().optional(),
  }),
]);

const categoryIdSchema = z.enum(['bracelets', 'rings', 'phone-charms', 'keychains', 'other']);

/**
 * SKU — неизменяемый код варианта. Попадает в накладные, поэтому после первой
 * накладной не переименовывается. Уникальность по всему каталогу проверяется
 * в src/utils/products.ts.
 */
export const skuSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'SKU: lowercase latin, digits and single dashes');

/**
 * Вариант товара. Необязательные поля, если не указаны, наследуются от товара.
 */
const variantSchema = z.object({
  sku: skuSchema,
  /** Имя варианта, дописывается к названию товара: "Guaco" + "Delicato" */
  name: z.union([z.string(), localizedString]).optional(),
  /** Короткая подпись для переключателя вариантов. Без неё используется name */
  label: z.union([z.string(), localizedString]).optional(),
  /** archived — снят с производства. Не удаляем: на него ссылаются накладные */
  status: z.enum(['active', 'archived']).default('active'),
  createdAt: z.string().optional(),
  inStock: z.boolean().default(true),
  stockLocations: z.array(stockLocationSchema),

  // Наследуемые от товара
  description: localizedString.optional(),
  price: z.number().optional(),
  categoryId: categoryIdSchema.optional(),
  images: z.array(mediaItemSchema).optional(),
  materials: z.array(z.string()).optional(),
  materialsHtml: z.string().optional(),
  badge: localizedString.optional(),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    order: z.number().default(99),
    createdAt: z.string().optional(),
    title: localizedString,
    description: localizedString,
    price: z.number(),
    currency: z.string().default('VND'),
    categoryId: categoryIdSchema.default('bracelets'),
    images: z.array(mediaItemSchema).default([]),
    materials: z.array(z.string()).optional(),
    materialsHtml: z.string().optional(),
    designedBy: z.string().optional(),
    badge: localizedString.optional(),
    remakeNote: localizedString.optional(),
    crafterNote: localizedString.optional(),
    variants: z.array(variantSchema).min(1),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    author: z.string().default('Anna BunnyBear'),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    icon: z.string().default('❓'),
    order: z.number().default(99),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    seoTitle: z.string(),
    seoDesc: z.string(),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  schema: z.object({
    seoTitle: z.string(),
    seoDesc: z.string(),
    hero: z.object({
      titlePrefix: z.string(),
      titleAccent: z.string(),
      greeting: z.string(),
      tagline: z.string(),
      authorName: z.string(),
      authorRole: z.string(),
      badgeCrafted: z.string(),
      badgeUnique: z.string(),
      btnExplore: z.string(),
      btnOrder: z.string(),
    }),
    featuresTitle: z.string(),
    featuresSubtitle: z.string(),
    features: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        desc: z.string(),
      })
    ),
  }),
});

const contacts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contacts' }),
  schema: z.object({
    seoTitle: z.string(),
    seoDesc: z.string(),
    title: z.string(),
    subtitle: z.string(),
    introHeading: z.string(),
    telegramBox: z.object({
      badge: z.string(),
      heading: z.string(),
      description: z.string(),
      btnText: z.string(),
      url: z.string(),
      perks: z.array(
        z.object({
          icon: z.string(),
          title: z.string(),
          text: z.string(),
        })
      ),
    }),
    channels: z.object({
      telegram: z.object({ label: z.string(), value: z.string(), url: z.string() }),
      instagram: z.object({ label: z.string(), value: z.string(), url: z.string() }),
      email: z.object({ label: z.string(), value: z.string() }),
      location: z.object({ label: z.string(), value: z.string() }),
    }),
  }),
});

export const collections = { products, blog, faq, about, home, contacts };
