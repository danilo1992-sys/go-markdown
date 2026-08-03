import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const Go = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/Go" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).passthrough(),
});

export const collections = { Go };
