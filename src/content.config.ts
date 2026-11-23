import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localizedString = z.object({
  en: z.string(),
  ru: z.string(),
  vi: z.string(),
});

const imageSchema = z.union([
  z.string(),
  z.object({
    src: z.string(),
    alt: z.union([z.string(), localizedString]).optional(),
  }),
]);

/**
 * Сколько штук лежит в точке. Генерируется из базы изделий (data/ → Dropbox)
 * скриптом scripts/export-data.mjs: каждая непроданная штука там — отдельная запись.
 * Доставка и самовывоз из мастерской доступны всегда, поэтому отдельного признака «онлайн» нет.
 */
const stockSchema = z.object({
  locationId: z.enum(['dalat', 'ngay-mai', 'cat-food']),
  quantity: z.number().int().nonnegative(),
  /** Комментарий к штукам в этой точке: чем они немного отличаются от фото */
  note: localizedString.optional(),
  images: z.array(imageSchema).default([]),
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

/** Товар. Имя файла — slug, он же адрес страницы: /catalog/<slug> */
const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    order: z.number().default(99),
    createdAt: z.string().optional(),
    title: localizedString,
    description: localizedString,
    price: z.number(),
    categoryId: categoryIdSchema.default('bracelets'),
    images: z.array(mediaItemSchema).default([]),
    /** Превью 40:22 для плашки в семействе */
    thumb: z.string().optional(),
    materials: z.array(z.string()).optional(),
    materialsHtml: z.string().optional(),
    designedBy: z.string().optional(),
    badge: localizedString.optional(),
    stock: z.array(stockSchema).default([]),
  }),
});

/**
 * Семейство — товары, которые показываются рядом на странице каждого из них:
 * варианты одного изделия или изделия по одной схеме. Товар состоит не больше чем в одном семействе.
 */
const families = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/families' }),
  schema: z.object({
    title: localizedString,
    members: z.array(
      z.object({
        product: reference('products'),
        /** Чем этот товар отличается от остальных. Выводится под плашкой */
        note: localizedString.optional(),
      })
    ).min(2),
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

export const collections = { products, families, blog, faq, about, home, contacts };
