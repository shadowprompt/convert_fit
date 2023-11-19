'use client'

import React, { useState } from 'react';
import Nav from '@/components/Nav';
import { Divider, List } from 'antd';
import Bottom from '@/components/Bottom';

export default function() {

  const [importList] = useState([{
    label: '高驰',
    url: 'https://trainingcn.coros.com/admin/views/activities',
    desc: '上述入口登录后点击右上角"导入数据"'
  }, {
    label: '佳明',
    url: 'https://connect.garmin.cn/modern/import-data',
    desc: '上述入口登录后点击"导入数据"'

  }, {
    label: 'Strava',
    url: 'https://www.strava.com/upload/select',
    desc: '上述入口登录后直接导入'
  }, {
    label: 'RQrun',
    url: 'https://www.rq.run/user/upload',
    desc: '上述入口登录后在页面中下方找到"手动上传"区域'
  }, {
    label: '华为',
    url: 'https://h5hosting.dbankcdn.com/cch5/healthkit/data-import/pages/oauth-callback.html#/',
    desc: '先从右上角登录后直接导入'
  }]);

  return (
    <div>
      <Nav />
      <Divider>主流运动平台导入数据入口</Divider>
      <List
        size="small"
        bordered
        dataSource={importList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={(
                <span>
                                    <span>{item.label}</span>
                                    <span><a href={item.url} target="_blank" rel="noreferrer">导入数据入口</a></span>
                                </span>
              )}
              description={item.desc}
            />
          </List.Item>
        )}
      />
      <Bottom />
    </div>
  )
}
