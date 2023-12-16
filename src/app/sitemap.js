import siteConfig from '@/app/siteConfig';
import { getMdList } from '@/lib/utils';

export default function sitemap() {
  const mdList = getMdList();
  const pathnameList = mdList.map(item => item.pathname);

  const pageList = pathnameList.map(item => {
    // 如果是 /xxx/index, 则去掉 /index
    const pathname = item.replace(/\/index$/, '');
    return {
      url: siteConfig.siteUrl + pathname,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    }
  }).filter(item => item.url !== siteConfig.siteUrl); // 过滤掉首页

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
