import { NextResponse } from "next/server";
const { nodeStore } = require('@daozhao/utils');

const localStorage = nodeStore('../localStorage/bundless_fit');
export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET(request) {
  let prevList = localStorage.getItem('list') || '[]';
  prevList = JSON.parse(prevList);
  return NextResponse.json({
    list: prevList,
  });
}
