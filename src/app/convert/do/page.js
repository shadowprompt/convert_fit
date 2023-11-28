'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Input, message, Radio, Upload } from 'antd';
import Nav from '@/components/Nav';
import ClientBottom from '@/components/client/ClientBottom';
import * as echarts from 'echarts';
import siteConfig from '@/app/siteConfig';

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
          <p className="sub"><b>SPORT/SPOR_xxx.csv</b></p>
          <p className="sub"><b>HEARTRATE_AUTO/HEARTRATE_AUTO_xxx.csv</b></p>
          <p className="sub"><b>ACTIVITY_MINUTE/ACTIVITY_MINUTE_xxx.csv</b></p>
          <p>放至一个文件夹内，打包成zip压缩包上传</p>
          <p className="img-box">
            <img src='/zip-intro-zepp.png' title='zepp压缩包结构说明' alt='zepp压缩包结构说明' />
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
        <Divider>转换请求响应统计图</Divider>
        <div id="chart" style={{height: '420px'}}></div>
        <Divider>压缩包文件格式说明</Divider>
        <section className="app-content">
          <div className="upload-type">
            <Radio.Group onChange={onTypeChange} value={type}>
              <Radio value="huawei">华为运动健康</Radio>
              <Radio value="zepp">Zepp Life（原小米运动）</Radio>
            </Radio.Group>
          </div>
          <Divider orientation="left" plain>待上传压缩包结构说明</Divider>
          <div className="upload-desc">
            { typeRender(type) }
            <div className="upload-intro">更多说明可以参考<a href="https://www.toutiao.com/article/7260290208145637929/" target="_blank" rel="noreferrer">华为、小米运动记录转fit和tcx格式工具转换效果展示及使用教程</a></div>
          </div>

          <Divider>提交转换申请</Divider>
          <p className="upload-box">
            请将<b>上述压缩包</b>及<b>打赏证明截图</b>发送至<b>JustNotify@qq.com</b>的邮箱
          </p>
        </section>
      </div>
      <ClientBottom />
    </div>
  )
}

export default MailPage;
