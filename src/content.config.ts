import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared media shape: a local image (rebased under /images/portfolio/) or a
// video (an external URL, e.g. YouTube). `caption` is the old per-media "tag".
const media = z
  .array(
    z.object({
      type: z.enum(['image', 'video']),
      url: z.string(),
      caption: z.string().optional(),
    }),
  )
  .default([]);

// Work: one Markdown file per game. Prose lives in the body; metadata here.
// `year` = release year (omitted for unreleased work); `status` labels
// unreleased entries ("Unannounced", "In development"). `order` drives the
// grid (1 = newest/first).
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    studio: z.string(),
    role: z.string(),
    year: z.number().optional(),
    status: z.string().optional(),
    order: z.number(),
    boxart: z.string(),
    media,
  }),
});

// Highlights: lighter "extras" cards (hobby + career moments).
const highlights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/highlights' }),
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    order: z.number(),
  }),
});

// Standalone pages (About, Resume) — content kept separate from layout.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    resumePdf: z.string().optional(),
  }),
});

export const collections = { work, highlights, pages };
