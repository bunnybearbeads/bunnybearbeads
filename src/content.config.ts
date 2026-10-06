import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localizedString = z.object({
  en: z.string(),
  ru: z.string(),
  vi: z.string(),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    title: localizedString,
    description: localizedString,
    price: z.number(),
    currency: z.string().default('USD'),
    categoryId: z.enum(['jewelry', 'beads', 'tools', 'findings']).default('jewelry'),
    category: localizedString,
    images: z.array(z.string()).default([]),
    inStock: z.boolean().default(true),
    materials: z.array(z.string()).optional(),
    badge: localizedString.optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/blog' }),
  schema: z.object({
    title: localizedString,
    excerpt: localizedString,
    content: localizedString,
    date: z.string(),
    author: z.string().default('Anna BunnyBear'),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { products, blog };
