'use client'

import React from 'react';
import Nav from '@/components/Nav';
import { Divider } from 'antd';

export default function() {
  return (
    <div>
      <Nav />
      <div className="app-intro">
        <p className="slogan">
          我们只能转换运动健康数据，并不能生产健康，为了健康，运动起来吧。
        </p>
        <p>
          将官方的导出数据解压后，选择其中的<b>必要的数据文件</b>（具体见待上传压缩包结构说明）打包至一个新的<b>.zip格式</b>压缩包，上传至本工具即可开始转换。
        </p>
        <p>
          待转换成功后您会收到一封来自<b>JustNotify@qq.com</b>的邮件，该邮件会含有一个转换结果压缩包的下载地址。
        </p>
        <p>
          该压缩包内含有转换后的fit和tcx格式数据，每条运动记录对应一个文件。
        </p>
      </div>
      <Divider>解压后文件夹命名规则说明</Divider>
      <div className="app-logo">
        <div className="img-box">
          <img src="/type-intro.png"
               title="运动类型说明" alt=""/>
        </div>
      </div>
    </div>
  )
}
