'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Divider, Input, message, Radio, Upload } from 'antd';
import Nav from '@/components/Nav';
import ClientBottom from '@/components/client/ClientBottom';
import * as echarts from 'echarts';
import siteConfig from '@/app/siteConfig';
import { chartDataProcessor, recordListProcessor } from '@/lib/utils';

export default function ChartPage() {
  const [listData, setListData] = useState([]);
  const chartInstanceRef1 = useRef(null);
  const chartInstanceRef2 = useRef(null);

  function getRecordList() {
    return fetch(siteConfig.apiBase + '/convert/recordList').then(response => response.json()).catch(err => {
      console.log('recordList err ~ ', err);
      return {};
    });
  }

  const recordList = useMemo(() => {
    return recordListProcessor(listData);
  }, [listData])

  function handleData() {
    const {x: dateList, dataMap} = chartDataProcessor(recordList, 'date');

    const {x: cityDataX, y: cityDataY} = chartDataProcessor(recordList, 'city');

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
  function initCityChart() {
    const instance = echarts.init(document.getElementById('chart'));
    const {x, y} = chartDataProcessor(recordList, 'city');
    instance.setOption({
      title: {
        text: '用户城市'
      },
      tooltip: {},
      legend: {
        data: ['请求次数']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: x,
        axisLabel: {
          color: '#333',
          interval: 0,
          //  让x轴文字方向为竖向
          formatter: function(value) {
            return value.split('').join('\n')
          }
        }
      },
      yAxis: {},
      series: [
        {
          name: '请求次数',
          type: 'line',
          data: y,
        },
      ]
    });
    return instance;
  }

  function initPaidChart() {
    const instance = echarts.init(document.getElementById('chart2'));
    const {x, dataMap} = chartDataProcessor(recordList, 'date');
    // 过滤掉没有打赏的
    const xList = x.filter(item => {
      const list = dataMap[item];
      return list.some(item => item.paid);
    });
    console.log('x ~ ', x, dataMap, xList);
    const y = xList.map(item => dataMap[item].reduce((acc, cur) => {
      return acc + (cur.payment === 'alipay' && cur.paid || 0);
    }, 0));
    instance.setOption({
      title: {
        text: '打赏数量'
      },
      tooltip: {},
      legend: {
        data: ['打赏金额']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xList,
      },
      yAxis: {},
      series: [
        {
          name: '打赏金额',
          type: 'line',
          data: y,
        },
      ]
    });
    return instance;
  }

  function onResize() {
    if (chartInstanceRef1.current) {
      chartInstanceRef1.current.resize();
    }
    if (chartInstanceRef2.current) {
      chartInstanceRef2.current.resize();
    }
  }

  useEffect(() => {
    chartInstanceRef1.current = initCityChart();
    chartInstanceRef2.current = initPaidChart();

    return () => {
      if (chartInstanceRef1.current) {
        chartInstanceRef1.current.dispose();
      }
      if (chartInstanceRef2.current) {
        chartInstanceRef2.current.dispose();
      }
    }
  }, [recordList])

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
        <div id="chart2" style={{height: '420px'}}></div>
      </div>
      <ClientBottom />
    </div>
  )
}
