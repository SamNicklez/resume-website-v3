import { client } from '@/sanity/client';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Fetch all published posts from Sanity ──
  const posts = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))] {
      "slug": slug.current,
      publishedAt
    }`
  );

  // ── Dynamic post entries ──
  const postEntries: MetadataRoute.Sitemap = posts.map(
    (post: { slug: string; publishedAt: string }) => ({
      url: `https://www.samnicklaus.com/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })
  );

  return [
    // ── Static pages ──
    {
      url: 'https://www.samnicklaus.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.samnicklaus.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.samnicklaus.com/blog/search',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // ── Dynamic blog posts ──
    ...postEntries,
  ];
}