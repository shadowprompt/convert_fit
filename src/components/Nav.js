import React from 'react';
import { HomeOutlined, ReadOutlined, ExportOutlined, RocketFilled, PayCircleFilled, MailFilled, FileZipOutlined, ImportOutlined, UnorderedListOutlined, CodepenOutlined, CodeSandboxOutlined, MediumOutlined } from '@ant-design/icons';
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
    pathname: 'javascript:void(0);',
    icon: <ExportOutlined />,
    children: [{
      label: '华为运动记录导出',
      pathname: '/export/huawei',
      icon: <CodepenOutlined />,
    }, {
      label: '华为运动记录导出5年',
      pathname: '/export/huawei5',
      icon: <CodeSandboxOutlined />,
    }, {
      label: '小米运动记录导出',
      pathname: '/export/xiaomi',
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
    label: '结果导入',
    pathname: '/convert/import',
    icon: <ImportOutlined />,
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
               title="转换格式" alt=""/>
        </div>
      </div>
    </>
  );
}
export default Nav;
