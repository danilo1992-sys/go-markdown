import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const Go = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/Go" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { Go };
