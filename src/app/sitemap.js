import siteConfig from '@/app/siteConfig';

export default function sitemap() {
  let pageList = ['/convert/readme', '/convert/export/huawei', '/convert/export/huawei5', '/convert/export/xiaomi', '/convert/do', '/convert/result', '/convert/import', '/convert/log', '/pay'];
  pageList = pageList.map(item => ({
    url: siteConfig.siteUrl + item,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...pageList,
  ]
}
