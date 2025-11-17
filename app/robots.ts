import { MetadataRoute } from 'next';

/**
 * Generate robots.txt for the PICABORD website
 * Allows all crawlers and references the sitemap
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://picabord.space/sitemap.xml',
  };
}
