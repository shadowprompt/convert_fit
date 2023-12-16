import React from 'react';
import Nav from '@/components/Nav';
import ServerBottom from '@/components/server/ServerBottom';
import { getFileData } from '@/lib/posts-md';
import { generateCommonSeoData } from '@/app/siteConfig';

export async function generateMetadata({ params, searchParams }, parent) {
  const data = await getFileData('');

  return generateCommonSeoData(data);
}

export default async function Home({ params }) {
  const data = await getFileData('');

  return (
    <div>
      <Nav pathname='/'/>
      <div className="app-intro">
        {
          (data.title) && (
            <div className="app-article-title">
              <h1>{data.title}</h1>
            </div>
          )
        }
        <section className="app-article-content" dangerouslySetInnerHTML={{__html: data.html}}></section>
      </div>
      <ServerBottom />
    </div>
  );
}
