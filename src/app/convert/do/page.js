'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Input, message, Radio, Upload } from 'antd';
import Nav from '@/components/Nav';
import ClientBottom from '@/components/client/ClientBottom';
import * as echarts from 'echarts';
import siteConfig from '@/app/siteConfig';
import { recordListProcessor, chartDataProcessor } from '@/lib/utils';

function MailPage() {

  const [type, setType] = useState('huawei');
  const [address, setAddress] = useState('');
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
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

    const {x, y, dataMap} = chartDataProcessor(list, 'date');

    return {
      dataMap,
      dateList: x,
      dataList: y,
      dataListSuccess: x.map(item => dataMap[item].filter(item => item.status === 'success').length),
      dataListZepp: x.map(item => dataMap[item].filter(item => item.type === 'zepp').length),
      dataListHuawei: x.map(item => dataMap[item].filter(item => item.type === 'huawei').length),
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

    chartInstanceRef.current.setOption(optionData);
  }

  function onResize() {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.resize();
    }
  }

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const onTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('zip_file', file);
    });
    formData.append('type', type);
    formData.append('address', address);
    setUploading(true);
    // 指定本地开发和本服务器开发
    const targetUrl = '/api/upload';
    fetch(targetUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.code === 1) {
          message.success('上传成功，转换结果随后将以邮件形式通知', 5);

        } else if (res.code === 0) {
          message.error('上传压缩包结构不正确，请按照说明重新整理后上传', 5);
        } else {
          message.error('当前任务繁忙，请稍后再试', 5);
        }
        setFileList([]);
      })
      .catch((err) => {
        console.log('err', err);
        message.error('上传出错');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };
  const beforeUpload = (file) => {
    setFileList([...fileList, file]);
    return false;
  };

  const typeRender = (type) => {
    if (type === 'huawei') {
      return (
        <div className="upload-desc-huawei">
          <p>将华为官网导出数据解压（可能需要密码）至文件夹</p>
          <p>将该文件夹中的以下文件</p>
          <p className="sub"><b>Motion path detail data & description/motion path detail data.json</b></p>
          <p>放至一个文件夹内，打包成zip压缩包上传</p>
          <p className="img-box">
            <img src='/zip-intro-huawei.png' title='华为压缩包结构说明' alt='华为压缩包结构说明' />
          </p>
        </div>
      );
    } else if (type === 'zepp') {
      return (
        <div className="upload-desc-zepp">
          <p>将zepp官网导出数据解压（可能需要密码）至文件夹</p>
          <p>将该文件夹中的以下文件</p>
          <p className="sub"><b>ACTIVITY_MINUTE/ACTIVITY_MINUTE_xxx.csv</b></p>
          <p className="sub"><b>HEARTRATE_AUTO/HEARTRATE_AUTO_xxx.csv</b></p>
          <p className="sub"><b>SPORT/SPOR_xxx.csv</b></p>
          <p>放至一个文件夹内，打包成zip压缩包上传</p>
          <p className="img-box">
            <img src='/zip-intro-zepp.png' title='zepp压缩包结构说明' alt='zepp压缩包结构说明' />
          </p>
        </div>
      );
    } else if (type === 'xiaomi') {
      return (
        <div className="upload-desc-xiaomi">
          <p>将小米官网导出数据解压（可能需要密码）至文件夹</p>
          <p>将该文件夹中的以下文件</p>
          <p className="sub"><b>XXX_MiFitness_hlth_center_fitness_data.csv</b></p>
          <p className="sub"><b>XXX_MiFitness_hlth_center_sport_record.csv</b></p>
          <p>放至一个文件夹内，打包成zip压缩包上传</p>
          <p className="img-box">
            <img src='/zip-intro-xiaomi.png' title='小米压缩包结构说明' alt='小米压缩包结构说明' />
          </p>
        </div>
      );
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
        <h1 className="app-article-title">转换运动记录</h1>
        <Divider>转换请求响应统计图</Divider>
        <div id="chart" style={{height: '420px'}}></div>
        <Divider>压缩包文件格式说明</Divider>
        <section className="app-content">
          <div className="upload-type">
            <Radio.Group onChange={onTypeChange} value={type}>
              <Radio value="huawei">华为运动健康</Radio>
              <Radio value="zepp">Zepp Life（原小米运动）</Radio>
              <Radio value="xiaomi">小米运动健康</Radio>
            </Radio.Group>
          </div>
          <Divider orientation="left" plain>待上传压缩包结构说明</Divider>
          <div className="upload-desc">
            { typeRender(type) }
            <div className="upload-intro">更多说明可以参考<a href="https://www.toutiao.com/article/7260290208145637929/" target="_blank" rel="noreferrer">华为、小米运动记录转fit和tcx格式工具转换效果展示及使用教程</a></div>
          </div>

          <Divider>提交转换申请</Divider>
          <p className="upload-box">
            请将<b>上述压缩包</b>及<b><a href={siteConfig.siteUrl + '/pay'} target="_blank">转账记录截图</a></b>发送至<b>JustNotify@qq.com</b>的邮箱
          </p>
        </section>
      </div>
      <ClientBottom />
    </div>
  )
}

export default MailPage;
