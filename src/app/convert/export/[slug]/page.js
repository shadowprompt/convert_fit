import React from 'react';
import Nav from '@/components/Nav';
import ServerBottom from '@/components/server/ServerBottom';
import { getFileData } from '@/lib/posts-md';
import { metadata as rootMetadata } from '@/app/layout';

export async function generateMetadata({ params, searchParams }, parent) {
  const data = await getFileData('./src/markdown/convert/export', params.slug);

  return {
    title: `${data.title} - ${rootMetadata.title}`,
    description: data.description,
    keywords: data.keywords,
  }
}

export default async function Page({ params }) {
  console.log('abc ~ ',params);
  const data = await getFileData('./src/markdown/convert/export', params.slug);

  return (
    <div>
      <Nav pathname='/convert/export/huawei'/>
      <div className="app-intro">
        <div className="app-article-title">
          <h1>{data.title}</h1>
        </div>
        <section className="app-article-content" dangerouslySetInnerHTML={{
          __html: data.html
        }}></section>
        <ServerBottom />
      </div>
    </div>
  )
}
