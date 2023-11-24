import React from 'react';
import Nav from '@/components/Nav';
import { Divider } from 'antd';
import ServerBottom from '@/components/server/ServerBottom';
import { metadata as rootMetadata } from '../../layout'
export const metadata = {
  title: `使用须知 - ${rootMetadata.title}`,
  pathname: '/convert/readme',
}
export default function() {
  return (
    <div>
      <Nav pathname={metadata.pathname}/>
      <div className="app-intro">
        <Divider>❶声明</Divider>
        <p className="slogan">
          我们只能转换运动健康数据，并不能生产健康，为了健康，运动起来吧。
        </p>
        <p>
          将官方的导出数据解压后，选择其中的<b>必要的数据文件</b>（具体见待上传压缩包结构说明）打包至一个新的<b>.zip格式</b>压缩包，上传至本工具方可开始转换。
        </p>

        <Divider><b style={{color: 'red'}}>❷使用必看</b></Divider>
        <p>
          运动记录转换工具诞生之初使用的是作为新用户购买的性能较强的华为云服务器（CPU4核 内存8G），为期三个月，已到期，续费太贵了。。。即使优惠后仍🉐3163.47元[流泪]
        </p>
        <p>
          2023年10月22日起迁移至公司同事的腾讯云服务器（CPU2核 内存4G），这个服务器比之前的服务器性能差了不少，转换工具在工作时容易让同事的服务器宕机。
        </p>
        <p>
          转换工具闲时基本不额外消耗什么，但是在转换过程需要进行解压缩、大量的数据读取转换和写入，这些都是消耗大量CPU算力、运行内存进行频繁的文件IO操作，尤其是不少高产的跑友，几千条数据很正常的，很容易造成服务器繁忙甚至崩溃。
        </p>
        <p>
          在各种优化后仍无明显效果，于2023年11月20日起改变转换工具的开放策略了——<a href="/pay"><b style={{color: 'red'}}>先打赏🍗后转换</b></a>。
        </p>

        <Divider>❸申请转换</Divider>
        <p>
          请将官方导出的运动记录<b>移除密码后</b>重新压缩成<b>zip包</b>及<b>打赏证明截图</b>发送至JustNotify@qq.com的邮箱
        </p>

        <Divider>❹接收转换结果</Divider>
        <p>
          待转换成功后您会收到一封来自<b>JustNotify@qq.com</b>的邮件，该邮件会含有一个转换结果压缩包的下载地址。
        </p>
        <p>
          该压缩包内含有转换后的fit和tcx格式数据，每条运动记录对应一个文件。
        </p>

        <Divider>❺解压后文件夹命名规则说明</Divider>
        <div className="app-logo">
          <div className="img-box">
            <img src="/type-intro.png"
                 title="运动类型说明" alt=""/>
          </div>
        </div>
      </div>
      <ServerBottom />
    </div>
  )
}
