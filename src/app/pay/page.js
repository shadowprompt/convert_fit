import React from 'react';
import { Divider } from 'antd';
import Nav from '@/components/Nav';
import ServerBottom from '@/components/server/ServerBottom';
import { metadata as rootMetadata } from '../layout'
export const metadata = {
  title: `打赏支持 - ${rootMetadata.title}`,
  pathname: '/pay',
}
export default function() {
  return (
    <div>
      <Nav pathname={metadata.pathname}/>
      <div className="app-intro">
        <Divider orientation="left">支付宝</Divider>
        <p>
          使用支付宝打赏，<b>5元</b>起步，后续再次转换<b>3元</b>起步。打赏后<b>24小时内</b>内完成转换，并返回转换结果。
        </p>
        <div className="img-box">
          <img className="zfb" src="/zfb.png"
               title="支付宝" alt=""/>
        </div>
        {/*<Divider orientation="left">今日头条</Divider>*/}
        {/*<p>*/}
        {/*  今日头条发布的文章、微头条等内容进行点赞，<b>10个赞</b>起步。点赞后<b>48小时内</b>内完成转换，并返回转换结果。*/}
        {/*</p>*/}
        {/*<div className="toutiao-box">*/}
        {/*  <div className="toutiao-des">欢迎来<span className="highlight">今日头条</span>关注支持我</div>*/}
        {/*  <img className="zfb" src="/qrcode.png"*/}
        {/*       title="锅巴瓜子 今日头条" alt=""/>*/}
        {/*</div>*/}
      </div>
      <ServerBottom />
    </div>
  )
}
