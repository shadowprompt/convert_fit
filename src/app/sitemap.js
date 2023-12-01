import siteConfig from '@/app/siteConfig';
import { getMdList } from '@/lib/utils';

export default function sitemap() {
  const mdList = getMdList();
  const pathnameList = mdList.map(item => item.pathname);

  const pageList = pathnameList.map(item => ({
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
