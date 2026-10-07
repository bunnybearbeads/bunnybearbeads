import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localizedString = z.object({
  en: z.string(),
  ru: z.string(),
  vi: z.string(),
});

const stockLocationSchema = z.object({
  type: z.enum(['offline', 'online']),
  city: z.string(),
  location: z.string().optional(),
  quantity: z.number().optional(),
  lastCheckedAt: z.string().optional(),
  note: z.string().optional(),
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
    categoryId: z.enum(['bracelets', 'rings', 'phone-charms', 'keychains', 'other']).default('bracelets'),
    category: localizedString,
    images: z.array(z.string()).default([]),
    inStock: z.boolean().default(true),
    materials: z.array(z.string()).optional(),
    materialsHtml: z.string().optional(),
    designedBy: z.string().optional(),
    stockLocations: z.array(stockLocationSchema).default([]),
    badge: localizedString.optional(),
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
