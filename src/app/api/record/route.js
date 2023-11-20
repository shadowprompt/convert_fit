import { NextResponse } from "next/server";
const { dLog, nodeStore } = require('@daozhao/utils');

const localStorage = nodeStore('../localStorage/bundless_fit');
export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET(request) {
  let prevList = localStorage.getItem('list') || '[]';
  prevList = JSON.parse(prevList);
  const successList = prevList.filter(item => item.status === 'success');
  const data = {
    count:  prevList.length + 50,
    successCount: successList.length + 50,
  };

  return NextResponse.json({data});
}


export async function POST(req, res) {
  const requestBody = await req.json();
  const address = requestBody.address;
  const type = requestBody.type;
  const fileName = requestBody.fileName;
  const status = requestBody.status;
  const ts = Date.now();
  let prevList = localStorage.getItem('list') || '[]';
  prevList = JSON.parse(prevList);

  dLog('log record ', fileName, `[${address} ${type}]`, status);

  if (fileName) {
    const target = prevList.find(item => item.fileName === fileName);
    // 命中则只更新状态和时间
    if (target) {
      target.status = status;
      target.ts = ts;
      localStorage.setItem('list', JSON.stringify(prevList));
    } else {
      localStorage.setItem('list', JSON.stringify([
        ...prevList,
        {
          address,
          type,
          fileName,
          status,
          ts,
        }
      ]));
    }
  }
  let finalList = localStorage.getItem('list') || '[]';
  finalList = JSON.parse(finalList);
  const successList = finalList.filter(item => item.status === 'success');
  const data = {
    count:  finalList.length + 50,
    successCount: successList.length + 50,
  };

  return NextResponse.json({data});
}
