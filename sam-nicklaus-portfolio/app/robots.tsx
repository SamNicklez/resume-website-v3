import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // ── General crawlers ──
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // No need for Google to index API routes
          '/studio/',       // Block Sanity Studio from being indexed
          '/_next/',        // Next.js internals
          '/admin/',        // Any admin routes
        ],
      },
      {
        // ── Block AI training crawlers ──
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'Google-Extended',
          'Bytespider',
          'Diffbot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.samnicklaus.com/sitemap.xml',
    host: 'https://www.samnicklaus.com',
  };
}