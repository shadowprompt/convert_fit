import React, { useState, useEffect } from 'react';

export default function () {
  const [countInfo, setCountInfo] = useState({
    count: 0,
    successCount: 0,
  });
  function getRecord() {
    return fetch('/api/record');
  }

  useEffect(() => {
    getRecord().then(response => response.json()).then(result => {
      setCountInfo(result.data);
    });
  }, [])

  return (
    <div className="countWrapper" style={{textAlign: 'center'}}>
      <p>本工具累计转换 <span style={{fontWeight: 'bold', color: '#ff0000', fontSize: '24px'}}>{countInfo.count} </span> 次</p>
      <p><span style={{display: 'none'}}>{countInfo.successCount}</span></p>
      <p><a href="https://beian.miit.gov.cn/" target="_blank" title="鄂ICP备2020023502号"
            rel="noreferrer">鄂ICP备2020023502号</a></p>
    </div>
  )
}
