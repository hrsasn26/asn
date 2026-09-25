import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '~/data/site';

export const GET: APIRoute = async (context) => {
  const articles = await getCollection('blog', ({ data }) => !data.draft);
  return rss({
    title: `Blog | ${site.nom}`,
    description: "Articles de l'agence",
    site: context.site ?? context.url.origin,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: `/blog/${article.id}`,
    })),
  });
};
