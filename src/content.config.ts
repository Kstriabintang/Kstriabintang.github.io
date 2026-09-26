// Content collections. A missing or wrong field fails the build (README › Content Model).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const projectCategories = ['ai-automation', 'web', 'mobile', 'security'] as const;
export type ProjectCategory = (typeof projectCategories)[number];

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(projectCategories),
    metric: z.string(),
    tags: z.array(z.string()).min(1).max(5),
    cover: z.object({
      gradient: z.tuple([z.string(), z.string()]),
      icon: z.string(),
    }),
    links: z.object({
      live: z.url().optional(),
      demo: z.url().optional(),
      source: z.url().optional(),
    }),
    client: z
      .object({
        anonymised: z.string(),
      })
      .optional(),
    status: z.string().optional(),
    year: z.number().int(),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.number(),
          prefix: z.string().optional(),
          suffix: z.string().optional(),
        }),
      )
      .length(3),
    stack: z.array(z.string()).min(1),
    featured: z.boolean().default(true),
    order: z.number().int(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).min(1).max(6),
    readingMinutes: z.number().int().positive(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
