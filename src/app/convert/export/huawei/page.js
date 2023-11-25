import React from 'react';
import Nav from '@/components/Nav';
import ServerBottom from '@/components/server/ServerBottom';
import { getFileData } from '@/lib/posts-md';
import { metadata as rootMetadata } from '@/app/layout';

function getMdData() {
  return getFileData('./src/markdown/convert/export', 'huawei');
}

export async function generateMetadata({ params, searchParams }, parent) {
  const data = await getMdData();

  return {
    title: `${data.title} - ${rootMetadata.title}`,
    keywords: '华为运动健康导出,华为运动健康导入高驰佳明,华为运动健康tcx,华为运动健康fit,华为运动健康导入华为,华为运动健康导入RQrun,华为运动健康导入数据'
  }
}

export default async function() {
  const data = await getMdData();

  return (
    <div>
      <Nav pathname='/convert/export/huawei'/>
      <div className="app-intro">
        <section className="app-article-section" dangerouslySetInnerHTML={{
          __html: data.html
        }}></section>
        <ServerBottom />
      </div>
    </div>
  )
}
