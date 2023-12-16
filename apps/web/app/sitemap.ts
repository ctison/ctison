import { MetadataRoute } from 'next';
import { links } from '@/_layout/links';
import { allPosts } from 'contentlayer/generated';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapLinks: MetadataRoute.Sitemap = [];

  links.forEach((link) => {
    sitemapLinks.push({
      url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${link.href}`,
    });
  });

  allPosts.forEach((post) => {
    sitemapLinks.push({
      url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${post.url}`,
    });
  });

  return sitemapLinks;
}
