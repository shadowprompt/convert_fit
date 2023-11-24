import React, { useEffect, useState } from 'react';
import siteConfig from '@/app/siteConfig';

function ClientBottom () {
  const [info, setInfo] = useState({
    count: 0,
    successCount: 0,
  });

  async function getRecord() {
    const data = await fetch(siteConfig.apiBase + '/convert/record').then(response => response.json());
    setInfo(data);
  }

  useEffect(() => {
    getRecord();
  }, [])

  return (
    <div className="countWrapper" style={{textAlign: 'center'}}>
      <p>转换工具累计响应转换请求 <span style={{fontWeight: 'bold', color: '#ff0000', fontSize: '24px'}}>{info.count} </span> 次</p>
      <p><span style={{display: 'none'}}>{info.successCount}</span></p>
      <p><a href="https://beian.miit.gov.cn/" target="_blank" title="鄂ICP备2020023502号"
            rel="noreferrer">鄂ICP备2020023502号</a></p>
    </div>
  )
}

export default ClientBottom;
