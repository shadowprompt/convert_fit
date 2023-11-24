import React from 'react';
import { Divider } from 'antd';
import Nav from '@/components/Nav';
import ServerBottom from '@/components/server/ServerBottom';
import AppList from '@/components/common/AppList';
import { metadata as rootMetadata } from '../../layout'
export const metadata = {
  title: `更新日志 - ${rootMetadata.title}`,
  pathname: '/convert/log'
}

export default function() {

  const updateLogList = [{
    title: '2023-11-20',
    type: 'desc',
    desc: '转换工具改用离线转换，不再服务器转换了，并实行先打赏🍗后转换'
  }, {
    title: '2023-10-24',
    type: 'desc',
    desc: '转换工具运行时严重影响共享服务器其它服务运行，暂时下调允许上传的压缩包大小上限'
  }, {
    title: '2023-10-22',
    type: 'desc',
    desc: '原服务器使用期限3个月即将到期，迁移至同事的共享服务器，并限制同时只能有1个转换任务'
  }, {
    title: '2023-09-22',
    desc: '转换结果细分运动类型：支持户外跑步、跑步机跑步（新增）、步行（新增）、户外自行车（新增）'
  }, {
    title: '2023-09-16',
    type: 'desc',
    desc: '上调支持的压缩包大小上限；优化转化逻辑，提高生成fit文件成功率'
  }, {
    title: '2023-08-18',
    type: 'desc',
    desc: '启用域名 https://convert.fit'
  }, {
    title: '2023-08-12',
    desc: '.tcx格式转换结果新增显示配速、海拔信息（仅限华为）'
  }, {
    title: '2023-08-05',
    desc: '.fit格式转换结果新增显示配速、海拔信息，显示每公里步幅（仅限华为）'
  }, {
    title: '2023-07-31',
    type: 'desc',
    desc: '页面兼容老版本浏览器'
  }, {
    title: '2023-07-30',
    desc: '.fit格式转换结果新增显示每公里距离、心率、配速（仅限华为）'
  }, {
    title: '2023-07-29',
    type: 'desc',
    desc: '显示各主要运动平台导入数据入口、本工具转换次数'
  }, {
    title: '2023-07-28',
    desc: '修正华为数据轨迹漂移问题'
  }];

  return (
    <div>
      <Nav pathname={metadata.pathname} />
      <div className="app-intro">
        <Divider>更新日志</Divider>
        <AppList list={updateLogList} />
        <ServerBottom />
      </div>
    </div>
  )
}
