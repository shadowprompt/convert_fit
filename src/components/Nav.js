import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { HomeOutlined, ReadOutlined, RocketFilled, PayCircleFilled, MailFilled, FileZipOutlined, ImportOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    label: (
      <a href="/" title="首页">
        首页
      </a>
    ),
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: (
      <a href="/convert/readme" title="使用须知">
        使用须知
      </a>
    ),
    key: '/convert/readme',
    icon: <ReadOutlined />,
  },
  // {
  //   label: (
  //     <a href="/convert/do" title="开始转换">
  //       开始转换
  //     </a>
  //   ),
  //   key: '/convert/do',
  //   icon: <RocketFilled />,
  // },
  {
    label: (
      <a href="/pay" title="打赏支持">
        打赏支持
      </a>
    ),
    key: '/pay',
    icon: <PayCircleFilled />,
  },
  {
    label: (
      <a href="/convert/mail" title="申请转换">
        申请转换
      </a>
    ),
    key: '/convert/mail',
    icon: <MailFilled />,
  },
  {
    label: (
      <a href="/convert/result" title="转换结果">
        转换结果
      </a>
    ),
    key: '/convert/result',
    icon: <FileZipOutlined />,
  },
  {
    label: (
      <a href="/convert/import" title="结果导入">
        结果导入
      </a>
    ),
    key: '/convert/import',
    icon: <ImportOutlined />,
  },
  {
    label: (
      <a href="/convert/log" title="更新日志">
        更新日志
      </a>
    ),
    key: '/convert/log',
    icon: <UnorderedListOutlined />,
  },
];
const Nav = () => {
  const pathname = usePathname()
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    console.log('click ', pathname, e);
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname])

  return (
    <div style={{marginBottom: '40px'}}>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <div className="app-logo">
        <div className="img-box">
          <img src="/tool-intro.png"
               title="转换格式" alt=""/>
        </div>
      </div>
    </div>
  );
};
export default Nav;
