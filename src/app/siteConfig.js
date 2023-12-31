import { DAOZHAO_GATEWAY_SERVER } from '@daozhao/config';

export const host = 'www.fitconverter.com';
export const siteUrl = `https://${host}`;
export const siteName = '运动记录转换工具';
export const apiBase = DAOZHAO_GATEWAY_SERVER;

export default {
  host,
  siteUrl,
  siteName,
  apiBase,
  bingUrl: 'https://www.bing.com/indexNow',
  bingKey: '4a3e9ca8c39d42809bdbf80cd153f78d',
  baiduUrl: 'http://data.zz.baidu.com/urls',
  baiduToken: 'MR07k0A4plkhN4G7',
  icpNumber: '鄂ICP备2020023502号-5',
}

export const commonSeoData = {
  title: `${siteName} && 华为小米运动记录转fit和tcx格式导入高驰佳明工具`,
  description: '一款运动记录转换导入工具，一款支持将华为小米运动记录转换格式导入高驰佳明工具，它能把华为小米运动记录转fit和tcx格式导入高驰佳明等主流运动平台。',
  keywords: '运动记录,转换工具,运动健康,格式转换,数据转换,华为运动记录,华为运动健康,小米运动记录,小米运动健康,zepp,Zepp Life,跑步数据,跑步记录,导入,佳明,高驰,导出,garmin,coros,RQrun,strava,Keep,json,csv,fit,tcx,xml,苹果运动健康,悦跑圈,咕咚',
}

export function generateCommonMetaData(data) {
  const url = siteUrl + data.pathname;
  const title = data.title ? `${data.title} - ${commonSeoData.title}` : commonSeoData.title;
  // 全站keywords+各自keywords
  const keywords = commonSeoData.keywords + (data.keywords ? `,${data.keywords}` : '');
  const description = data.description || commonSeoData.description;
  const publishIsoTime = new Date('2023-12-12 10:00:00').toISOString();
  const updateIsoTime = new Date().toISOString();
  return {
    title,
    keywords,
    description,
    category: 'tools',
    bookmarks: url,
    metadataBase: new URL(url),
    // 主站标识
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      publishedTime: publishIsoTime,
      'bytedance:published_time': publishIsoTime,
      'bytedance:updated_time': updateIsoTime,
      authors: ['锅巴瓜子'],
      locale: 'zh-CN',
      type: 'website',
    },
    other: {
      'bytedance:published_time': publishIsoTime,
      'bytedance:updated_time': updateIsoTime,
    }
  };
}
