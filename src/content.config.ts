import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

/** Articles du blog (référencement). */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Études de cas de la page Réalisations.
 * Règle du projet : uniquement des projets réels, avec l'accord du client.
 */
const realisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realisations' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    client: z.string(),
    service: z.enum([
      'sites-web',
      'applications-sur-mesure',
      'automatisation-integrations',
      'hebergement-maintenance',
    ]),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, realisations };
