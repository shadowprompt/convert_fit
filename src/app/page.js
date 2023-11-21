'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Divider } from 'antd';
import Nav from '@/components/Nav';
import Bottom from '@/components/Bottom';
import * as echarts from 'echarts';

export default function() {

  const [listData, setListData] = useState([]);
  const chartInstanceRef = useRef(null);

  function getRecordList() {
    return fetch('/api/recordList');
  }

  function handleData() {
    const list = listData.map(item => {
      const fileName = item.fileName;
      const ts = fileName.replace('fit_', '') * 1;
      const date = new Date(ts);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return {
        ...item,
        date: `${year}-${month}-${day}`,
      }
    });

    const dataListMap = list.reduce((acc, cur) => {
      const list = acc[cur.date] || [];
      list.push(cur);
      acc[cur.date] = list;
      return acc;
    }, {});

    const sortDateList = Object.keys(dataListMap).sort((a, b) => new Date(a) - new Date(b));

    // const sortDateListWithFileCount = sortDateList.filter(item => {
    //   const list = dataListMap[item];
    //   return list.some(item => item.fileCreatedCount)
    // });

    // const addressListMap = list.reduce((acc, cur) => {
    //   const list = acc[cur.address] || [];
    //   list.push(cur);
    //   acc[cur.address] = list;
    //   return acc;
    // }, {});
    //
    // const addressList = Object.keys(addressListMap).filter(item => addressListMap[item].length > 5).sort((a, b) => addressListMap[b].length - addressListMap[a].length);

    return {
      dataListMap,
      dateList: sortDateList,
      dataList: sortDateList.map(item => dataListMap[item].length),
      dataListSuccess: sortDateList.map(item => dataListMap[item].filter(item => item.status === 'success').length),
      dataListZepp: sortDateList.map(item => dataListMap[item].filter(item => item.type === 'zepp').length),
      dataListHuawei: sortDateList.map(item => dataListMap[item].filter(item => item.type === 'huawei').length),
      // dateListWithFileCount: sortDateListWithFileCount,
      // dataListWithFileCount: sortDateListWithFileCount.map(item => {
      //   const list = dataListMap[item];
      //   return list.reduce((acc, curr) => acc + curr.fileCreatedCount, 0)
      // }),
      // addressListMap,
      // addressList: addressList.map(item => {
      //   const [name, domain = ''] = item.split('@');
      //   const hideName = Array(Math.max(0, name.length - 2)).fill('*').join('');
      //   return name.slice(0, 1) + hideName + domain.slice(-1) + `@${domain}`;
      // }),
      // addressDataList: addressList.map(item => addressListMap[item].length),
    }
  }
  function initChart() {
    chartInstanceRef.current = echarts.init(document.getElementById('chart'));
    const data = handleData();
    // 绘制图表
    const optionData = {
      // title: {
      //   text: '转换工具使用情况'
      // },
      tooltip: {},
      legend: {
        data: ['请求次数', '转换次数', '华为次数', '小米次数']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.dateList,
      },
      yAxis: {},
      series: [
        {
          name: '请求次数',
          type: 'bar',
          data: data.dataList,
        },
        {
          name: '转换次数',
          type: 'bar',
          data: data.dataListSuccess,
        },
        {
          name: '华为次数',
          type: 'line',
          data: data.dataListHuawei,
        },
        {
          name: '小米次数',
          type: 'line',
          data: data.dataListZepp,
        },
      ]
    };

    const optionData2 = {
      title: {
        text: '转换工具用户转换次数'
      },
      tooltip: {},
      legend: {
        data: ['请求次数']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.addressList,
      },
      yAxis: {},
      series: [
        {
          name: '请求次数',
          type: 'line',
          data: data.addressDataList,
        },
      ]
    };
    chartInstanceRef.current.setOption(optionData);
  }

  function onResize() {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.resize();
    }
  }

  useEffect(() => {
    initChart();
  }, [listData])

  useEffect(() => {
    window.addEventListener('resize', onResize);

    getRecordList().then(response => response.json()).then(result => {
      const list = result?.list || [];
      setListData(list);
    });
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [])

  return (
    <div>
      <Nav />
      <div className="app-intro">
        <p className="slogan">
          每一次运动锻炼了我们的身体，值得留存在我们的记录里，不负每一滴汗水，尊重每一次付出。
        </p>
        <p>
          本工具旨在为各位跑友转换运动记录数据，支持将<b>华为运动健康</b>、<b>Zepp Life（原小米运动）</b>官方导出的运动数据转换成业内通用的fit（推荐）或tcx格式，然后即可顺利导入主流的运动平台，比如<b>高驰</b>、<b>佳明</b>、<b>RQrun</b>、<b>Strava</b>等。后续可能会支持fit和tcx格式互转、支持其它运动平台等功能。
        </p>
        <Divider>转换请求响应统计图</Divider>
        <div id="chart" style={{height: '420px'}}></div>
        <Divider>转换效果展示</Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={10}>
            <Divider>华为导入高驰</Divider>
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
            <Divider>小米导入高驰</Divider>
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
      <Bottom />
    </div>
  );
}
