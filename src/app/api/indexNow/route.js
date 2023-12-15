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
    const indexNowParams = {
      host: siteConfig.host,
      key: siteConfig.indexNowKey,
      keyLocation: `${siteConfig.siteUrl}/${siteConfig.indexNowKey}.txt`,
      urlList: updateList.map(item => siteConfig.siteUrl + item.pathname),
    }
    return axios.post(siteConfig.indexNowUrl, indexNowParams).then(res => {
      dLog('indexNow ~ res', res.status, res.statusText);
      return NextResponse.json({
        ...data,
        indexNowParams,
        success: true,
        status: res.status,
      });
    }).catch(err => {
      dLog('indexNow ~ err', err);
      return NextResponse.json({
        ...data,
        indexNowParams,
        success: false,
      });
    });
  } else {
    return NextResponse.json({data});
  }
}
