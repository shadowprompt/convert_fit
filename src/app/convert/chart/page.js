'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Input, message, Radio, Upload } from 'antd';
import Nav from '@/components/Nav';
import ClientBottom from '@/components/client/ClientBottom';
import * as echarts from 'echarts';
import siteConfig from '@/app/siteConfig';
import { chartDataProcessor, recordListProcessor } from '@/lib/utils';

export default function ChartPage() {
  const [listData, setListData] = useState([]);
  const chartInstanceRef = useRef(null);

  function getRecordList() {
    return fetch(siteConfig.apiBase + '/convert/recordList').then(response => response.json()).catch(err => {
      console.log('recordList err ~ ', err);
      return {};
    });
  }

  function handleData() {
    const list = recordListProcessor(listData);

    const {x: dateList, dataMap} = chartDataProcessor(list, 'date');

    const {x: cityDataX, y: cityDataY} = chartDataProcessor(list, 'city');

    return {
      dataMap,
      dateList,
      dataList: dateList.map(item => dataMap[item].length),
      dataListSuccess: dateList.map(item => dataMap[item].filter(item => item.status === 'success').length),
      dataListZepp: dateList.map(item => dataMap[item].filter(item => item.type === 'zepp').length),
      dataListHuawei: dateList.map(item => dataMap[item].filter(item => item.type === 'huawei').length),
      cityDataX,
      cityDataY,
    }
  }
  function initChart() {
    chartInstanceRef.current = echarts.init(document.getElementById('chart'));
    const data = handleData();
    // 绘制图表
    const optionData = {
      title: {
        text: '转换工具使用情况'
      },
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

    const optionData3 = {
      title: {
        text: '转换工具用户城市'
      },
      tooltip: {},
      legend: {
        data: ['请求次数']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.cityDataX,
      },
      yAxis: {},
      series: [
        {
          name: '请求次数',
          type: 'line',
          data: data.cityDataY,
        },
      ]
    };
    chartInstanceRef.current.setOption(optionData3);
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
    console.log('getRecordList ~ ', 1);

    getRecordList().then(result => {
      const list = result?.list || [];
      setListData(list);
    });
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [])

  return (
    <div>
      <Nav pathname='/convert/do'/>
      <div className="app-intro">
        <Divider>转换数据统计图</Divider>
        <div id="chart" style={{height: '420px'}}></div>
      </div>
      <ClientBottom />
    </div>
  )
}
