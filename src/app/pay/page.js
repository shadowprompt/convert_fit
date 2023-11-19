'use client'

import React from 'react';
import Nav from '@/components/Nav';
import { Divider } from 'antd';

export default function() {
  return (
    <div>
      <Nav />
      <div className="img-box">
        <img className="zfb" src="/zfb.png"
             title="转换格式" alt=""/>
      </div>
      <Divider plain={true}>如果本工具解决了您的难题，也可以在今日头条支持我🍗</Divider>
      <div className="toutiao-box">
        <div className="toutiao-des">欢迎来<span className="highlight">今日头条</span>关注支持我</div>
        <img className="zfb" src="/qrcode.png"
             title="锅巴瓜子 今日头条" alt=""/>
      </div>
    </div>
  )
}
