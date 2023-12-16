import React from 'react';
import Nav from '@/components/Nav';
import ServerBottom from '@/components/server/ServerBottom';
import { getFileData } from '@/lib/posts-md';
import { generateCommonSeoData } from '@/app/siteConfig';

export async function generateMetadata({ params, searchParams }, parent) {
  const data = await getFileData(params.slug);

  return generateCommonSeoData(data);
}

export default async function SlugPage({ params }) {
  const data = await getFileData(params.slug);
  console.log('SlugPage ~ ', params, data.pathname);
  return (
    <div>
      <Nav pathname={data.pathname}/>
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
