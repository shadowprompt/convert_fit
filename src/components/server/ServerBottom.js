import React from 'react';
import siteConfig from '@/app/siteConfig';

function getRecord() {
  return fetch(siteConfig.apiBase + '/convert/record').then(response => response.json());
}
async function ServerBottom() {

  const result = await getRecord();
  const data = result.data || {};

  return (
    <div className="countWrapper" style={{textAlign: 'center'}}>
      <p>转换工具累计响应转换请求 <span style={{fontWeight: 'bold', color: '#ff0000', fontSize: '24px'}}>{data.count} </span> 次</p>
      <p><span style={{display: 'none'}}>{data.successCount}</span></p>
      <p><a href="https://beian.miit.gov.cn/" target="_blank" title="鄂ICP备2020023502号"
            rel="noreferrer">鄂ICP备2020023502号</a></p>
    </div>
  )
}

export default ServerBottom;
