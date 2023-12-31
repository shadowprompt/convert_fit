import React from 'react';
import siteConfig from '@/app/siteConfig';

function getRecord() {
  return fetch(siteConfig.apiBase + '/convert/record', { cache: 'force-cache' }).then(response => response.json());
}
async function ServerBottom() {

  const result = await getRecord();

  return (
    <div className="countWrapper">
      <p>累计响应转换请求 <span className="highlight">{result.count} </span> 次，转换运动记录 <span className="highlight">{result.sportsCount} </span>条</p>
      <p><span style={{display: 'none'}}>{result.successCount}</span></p>
      <p><a href={siteConfig.siteUrl + '/sitemap.xml'} target="_blank">{siteConfig.siteName}</a></p>
      <p><a href="https://beian.miit.gov.cn/" target="_blank" title={siteConfig.icpNumber}
            rel="noreferrer">{siteConfig.icpNumber}</a></p>
    </div>
  )
}

export default ServerBottom;
