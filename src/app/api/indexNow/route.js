import { NextResponse } from "next/server";
import { getMdDataList } from '@/lib/utils';
import siteConfig from '@/app/siteConfig';
const axios = require('axios');

const { dLog } = require('@daozhao/utils');

async function getUpdateMdList() {
  const list = await getMdDataList();

  const ts = Date.now();
  const oneDayTs = 24 * 60 * 60 * 1000;
  return list.filter(item => (ts - new Date(item.dateYMD).getTime()) < oneDayTs);
}

function handleResponse(updateList) {
  if (updateList.length > 0) {
    // bodyList里面的元素直接就是其pathname
    const urlList = updateList.map(item => siteConfig.siteUrl + (item.pathname || item || '').replace(/\/index$/, ''));

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
        updateList,
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
        updateList,
        bingParams,
        baiduParams,
        success: false,
        err: err + '',
      });
    });
  } else {
    return NextResponse.json({
      updateList,
    });
  }
}

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req) {
  const updateMdList = await getUpdateMdList();

  return handleResponse(updateMdList)
}

export async function POST(req) {
  const requestBody = await req.json();
  const bodyList = requestBody.list || [];

  const updateMdList = await getUpdateMdList();

  const pathnameSet = new Set();
  const updateList= [
    ...updateMdList,
    ...bodyList,
  ].reduce((acc, curr) => {
    const pathname = curr.pathname || curr || '';
    if (!pathnameSet.has(pathname)) {
      pathnameSet.add(pathname);

      return [
        ...acc,
        curr
      ];
    }
    return acc;
  }, [])

  return handleResponse(updateList);
}
