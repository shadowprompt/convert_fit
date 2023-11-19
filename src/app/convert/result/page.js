'use client'

import React from 'react';
import Nav from '@/components/Nav';
import { Divider, Row, Col } from 'antd';

export default function() {
  return (
    <div>
      <Nav />
      <div className="app-intro">
        <Divider>邮件内容</Divider>
        <p>
          待数据转换完成后就会收到如下内容的邮件
        </p>
        <div className="app-logo">
          <div className="img-box">
            <img src="/mail_result.png"
                 title="邮件内容" alt=""/>
          </div>
        </div>
        <p>
          使用里面的fit.zip或tcx.zip均可，推荐使用fit.zip。
        </p>
        <Row gutter={16}>
          <Col className="gutter-row" span={10}>
            <div className="app-logo">
              <div className="img-box">
                <img src="/fit_result.png"
                     title="fit.zip" alt=""/>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={10} offset={4}>
            <div className="app-logo">
              <div className="img-box">
                <img src="/tcx_result.png"
                     title="tcx.zip" alt=""/>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
