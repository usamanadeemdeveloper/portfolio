import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Protect Sanity Studio from indexing
    },
    sitemap: 'https://usamanadeem.vercel.app/sitemap.xml',
  }
}
