import React from 'react';

function getRecord() {
  return fetch('https://convert.fit/api/record').then(response => response.json());
}
export default async function () {

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
