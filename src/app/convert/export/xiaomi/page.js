import React from 'react';
import Nav from '@/components/Nav';
import ServerBottom from '@/components/server/ServerBottom';
import { getFileData } from '@/lib/posts-md';
import { metadata as rootMetadata } from '@/app/layout';

function getMdData() {
  return getFileData('./src/markdown/convert/export', 'xiaomi');
}

export async function generateMetadata({ params, searchParams }, parent) {
  const data = await getMdData();

  return {
    title: `${data.title} - ${rootMetadata.title}`,
    keywords: '小米运动健康zepp life数据导出,小米运动健康zepp life数据导入高驰佳明,小米运动健康zepp life数据tcx,小米运动健康zepp life数据fit,小米运动健康zepp life数据导入华为,小米运动健康zepp life数据导入RQrun,小米运动健康zepp life导入数据'
  }
}

export default async function() {
  const data = await getMdData();

  return (
    <div>
      <Nav pathname='/convert/export/xiaomi'/>
      <div className="app-intro">
        <section className="app-article-section" dangerouslySetInnerHTML={{
          __html: data.html
        }}></section>
        <ServerBottom />
      </div>
    </div>
  )
}
