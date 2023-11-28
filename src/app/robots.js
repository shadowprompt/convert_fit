import siteConfig from '@/app/siteConfig';
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: siteConfig.siteUrl + '/sitemap.xml',
  }
}
