import { NextResponse } from "next/server";
import { getMdDataList, getMdList } from '@/lib/utils';
import siteConfig from '@/app/siteConfig';
const axios = require('axios');

const { dLog } = require('@daozhao/utils');

export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET(request) {
  const list = await getMdDataList();

  const ts = Date.now();
  const oneDayTs = 24 * 60 * 60 * 1000;
  const updateList = list.filter(item => (ts - new Date(item.dateYMD).getTime()) < oneDayTs);



  const data = {
    updateList,
  };

  if (updateList.length > 0) {
    const urlList = updateList.map(item => siteConfig.siteUrl + (item.pathname).replace(/\/index$/, ''));

    const bingParams = {
      host: siteConfig.host,
      key: siteConfig.bingKey,
      keyLocation: `${siteConfig.siteUrl}/${siteConfig.bingKey}.txt`,
      urlList,
    };

    const baiduParams = urlList.join('\n');

    return Promise.all([
      axios.post(siteConfig.bingUrl, bingParams),
      axios.post(`${siteConfig.baiduUrl}?site=${siteConfig.siteUrl}&token=${siteConfig.baiduToken}`, baiduParams),
    ]).then(([bingRes, baiduRes]) => {
      dLog('bingRes', bingRes.status, bingRes.statusText);
      dLog('baiduRes', baiduRes.status, baiduRes.statusText);
      return NextResponse.json({
        ...data,
        bingParams,
        baiduParams,
        success: true,
        bing: {
          status: bingRes.status,
          statusText: bingRes.statusText,
        },
        baidu: {
          status: baiduRes.status,
          statusText: baiduRes.statusText,
          data: baiduRes.data,
        }
      });
    }).catch(err => {
      dLog('indexNow ~ err', err);
      return NextResponse.json({
        ...data,
        bingParams,
        baiduParams,
        success: false,
        err: err + '',
      });
    });
  } else {
    return NextResponse.json({data});
  }
}
