import React, { useEffect, useState } from 'react';
import siteConfig from '@/app/siteConfig';

function ClientBottom () {
  const [result, setResult] = useState({
    count: 0,
    successCount: 0,
    sportsCount: 0,
  });

  async function getRecord() {
    const data = await fetch(siteConfig.apiBase + '/convert/record').then(response => response.json());
    setResult(data);
  }

  useEffect(() => {
    getRecord();
  }, [])

  return (
    <div className="countWrapper" style={{textAlign: 'center'}}>
      <p>累计响应转换请求 <span style={{fontWeight: 'bold', color: '#ff0000', fontSize: '24px'}}>{result.count} </span> 次，转换运动记录 <span style={{fontWeight: 'bold', color: '#ff0000', fontSize: '24px'}}>{result.sportsCount} </span>条</p>
      <p><span style={{display: 'none'}}>{result.successCount}</span></p>
      <p><a href={siteConfig.siteUrl + '/sitemap.xml'} target="_blank">{siteConfig.siteName}</a></p>
      <p><a href="https://beian.miit.gov.cn/" target="_blank" title="鄂ICP备2020023502号"
            rel="noreferrer">鄂ICP备2020023502号</a></p>
    </div>
  )
}

export default ClientBottom;
