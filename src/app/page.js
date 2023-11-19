'use client'

import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Row, Col, Divider, Radio, List } from 'antd';
import Nav from '@/components/Nav';

export default function() {

  return (
    <div>
      <Nav />
      <div className="app-intro">
        <p className="slogan">
          每一次运动锻炼了我们的身体，值得留存在我们的记录里，不负每一滴汗水，尊重每一次付出。
        </p>
        <p>
          本工具旨在为各位跑友转换运动记录数据，支持将<b>华为运动健康</b>、<b>Zepp Life（原小米运动）</b>官方导出的运动数据转换成业内通用的fit（推荐）或tcx格式，然后即可顺利导入主流的运动平台，比如高驰、佳明、RQrun、Strava等。后续可能会支持fit和tcx格式互转、支持其它运动平台等功能。
        </p>
        <Divider orientation="left">华为运动记录转换后导入高驰效果</Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={10}>
            <Divider>华为运动记录转换后导入高驰效果</Divider>
            <p>
              官方导出的数据细节很齐全，转换后效果还是不错的
            </p>
            <div className="app-logo">
              <div className="img-box">
                <img src="/huawei_coros.jpeg"
                     title="华为运动记录转换后导入高驰效果" alt=""/>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={10} offset={4}>
            <Divider>小米运动记录转换后导入高驰效果</Divider>
            <p>
              可惜的是官方导出的数据极其不全（无GPS，只有零星的几个时间点有步频信息），转换后基本上只能看看心率了。
            </p>
            <p>
              强烈建议使用小米系又在乎数据记录的跑友要么别换平台了，要么趁早换。
            </p>
            <div className="app-logo">
              <div className="img-box">
                <img src="/zepp_coros.jpeg"
                     title="小米运动记录转换后导入高驰效果" alt=""/>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
