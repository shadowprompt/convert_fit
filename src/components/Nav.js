import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { AppstoreOutlined, MailOutlined, HomeOutlined, ReadOutlined, RocketFilled, PayCircleFilled, SettingOutlined } from '@ant-design/icons';
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
  {
    label: (
      <a href="/convert/do" title="开始转换">
        开始转换
      </a>
    ),
    key: '/convert/do',
    icon: <RocketFilled />,
  },
  {
    label: (
      <a href="/pay" title="支付">
        支付
      </a>
    ),
    key: '/pay',
    icon: <PayCircleFilled />,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
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
