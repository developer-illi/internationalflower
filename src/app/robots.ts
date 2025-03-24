import { MetadataRoute } from 'next'
import { ifaMetadata } from '@/constants/metadata'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = ifaMetadata.siteUrl

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/api/', '/_next/', '/resources/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
