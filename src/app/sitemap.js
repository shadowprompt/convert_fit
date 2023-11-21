const SITE = 'https://convert.fit';
export default function sitemap() {
  let pageList = ['/convert/mail', '/convert/result', '/convert/import', '/convert/log', '/pay'];
  pageList = pageList.map(item => ({
    url: SITE + item,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...pageList,
  ]
}
