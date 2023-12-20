import siteConfig from '@/app/siteConfig';
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    host: siteConfig.host,
    sitemap: siteConfig.siteUrl + '/sitemap.xml',
  }
}
