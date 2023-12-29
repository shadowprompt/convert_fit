import React from 'react';
import { HomeOutlined, ReadOutlined, ExportOutlined, DatabaseOutlined, PayCircleFilled, MailFilled, FileZipOutlined, ImportOutlined, UnorderedListOutlined, CodepenOutlined, CodeSandboxOutlined, MediumOutlined } from '@ant-design/icons';
import AppNav from '@/components/common/AppNav';

const navList = [
  {
    label: '首页',
    pathname: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '使用须知',
    pathname: '/convert/readme',
    icon: <ReadOutlined />,
  },
  {
    label: '运动记录导出',
    pathname: '/convert/export',
    icon: <ExportOutlined />,
    children: [{
      label: '华为运动记录导出',
      pathname: '/convert/export/huawei',
      icon: <CodepenOutlined />,
    }, {
      label: '导出近5年的华为运动记录',
      pathname: '/convert/export/huawei5',
      icon: <CodeSandboxOutlined />,
    }, {
      label: '小米运动记录导出',
      pathname: '/convert/export/xiaomi',
      icon: <MediumOutlined />,
    }]
  },
  {
    label: '打赏支持',
    pathname: '/pay',
    icon: <PayCircleFilled />,
  },
  {
    label: '开始转换',
    pathname: '/convert/do',
    icon: <MailFilled />,
  },
  {
    label: '转换结果',
    pathname: '/convert/result',
    icon: <FileZipOutlined />,
  },
  {
    label: '转换结果导入',
    pathname: '/convert/import',
    icon: <ImportOutlined />,
  },
  {
    label: '博客',
    unClickAble: true,
    pathname: '/blog',
    icon: <DatabaseOutlined />,
    children: [{
      label: '常见运动记录格式',
      pathname: '/blog/fileExtension',
      icon: <ReadOutlined />,
    }, {
      label: '为什么转换格式',
      pathname: '/blog/whyConvert',
      icon: <ReadOutlined />,
    }, {
      label: '华为运动健康数据同步至Keep',
      pathname: '/blog/huawei_sync_to_keep',
      icon: <ReadOutlined />,
    }, {
      label: '华为运动健康数据同步至微信',
      pathname: '/blog/huawei_sync_to_wechat',
      icon: <ReadOutlined />,
    }, {
      label: '为什么劝大家慎入小米系',
      pathname: '/blog/why_careful_with_xiaomi',
      icon: <ReadOutlined />,
    }, {
      label: '为什么app上显示的跑步轨迹会出现偏移',
      pathname: '/blog/running_track_offset',
      icon: <ReadOutlined />,
    }, {
      label: '怎么批量删除佳明运动记录',
      pathname: '/blog/remove_garmin_duplicate_records',
      icon: <ReadOutlined />,
    }, {
      label: '小米运动健康文件过大需分段',
      pathname: '/blog/xiaomi_give_up_export_time_range.md',
      icon: <ReadOutlined />,
    }]
  },
  {
    label: '更新日志',
    pathname: '/convert/log',
    icon: <UnorderedListOutlined />,
  },
];
function Nav(props) {

  return (
    <>
      <div className="app-header">
        <div className="app-nav">
          <AppNav list={navList} pathname={props.pathname}/>
        </div>
      </div>
      <div className="app-logo">
        <div className="img-box">
          <img src="/tool-intro.png"
               title="转换格式" alt="转换格式"/>
        </div>
      </div>
    </>
  );
}
export default Nav;
