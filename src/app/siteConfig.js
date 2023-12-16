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
  indexNowUrl: 'https://www.bing.com/indexNow',
  indexNowKey: '4a3e9ca8c39d42809bdbf80cd153f78d',
  icpNumber: '鄂ICP备2020023502号-5',
}

export const commonSeoData = {
  title: `${siteName} && 华为小米运动记录转fit和tcx格式导入高驰佳明工具`,
  description: '一款运动记录转换导入工具，一款支持将华为小米运动记录转换格式导入高驰佳明工具，它能把华为小米运动记录转fit和tcx格式导入高驰佳明等主流运动平台。',
  keywords: '运动记录转换工具,运动记录格式转换,运动记录导入,华为运动格式转换,小米运动格式转换,华为数据导入高驰,华为数据导入佳明,小米数据导入高驰,小米数据导入佳明,高驰导入佳明,佳明导入高驰,华为运动导出,小米运动导出,zepp数据导出,苹果健康导出,keep数据导入,fit,tcx,gpx',
}

export function generateCommonMetaData(data) {
  const url = siteUrl + data.pathname;
  const title = data.title ? `${data.title} - ${commonSeoData.title}` : commonSeoData.title;
  const keywords = data.keywords || commonSeoData.keywords;
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
