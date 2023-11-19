'use client'

import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, message, Upload, Divider, Radio, List } from 'antd';
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
          本工具旨在为各位跑友转换运动记录数据，支持将<b>华为运动健康</b>、<b>Zepp Life（原小米运动）</b>官方导出的运动数据转换成业内通用的fit（推荐）或tcx格式，然后即可顺利导入主流的运动平台，比如高驰、佳明、RQrun、Strava等。
        </p>
      </div>
    </div>
  );
}
