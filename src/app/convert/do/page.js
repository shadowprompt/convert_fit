'use client'

import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, message, Radio, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Nav from '@/components/Nav';
import Bottom from '@/components/Bottom';

export default function() {

  const [type, setType] = useState('huawei');
  const [address, setAddress] = useState('');
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

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
        console.log('response ~ ', response);
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
            <img src='/zip-intro-huawei.png' alt='华为压缩包结构说明' />
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
            <img src='/zip-intro-zepp.png' alt='zepp压缩包结构说明' />
          </p>
        </div>
      );
    }
  }

  return (
    <div>
      <Nav />
      <Divider>1. 请输入接收结果的邮箱</Divider>
      <div className="upload-address">
        <Input placeholder="转换结果将以邮件形式通知" value={address} onChange={onAddressChange}/>

      </div>
      <Divider>2. 请选择正确的数据类型</Divider>
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

        <Divider>3. 上传数据</Divider>

        <div className="upload-box">
          <Upload onRemove={onRemove} beforeUpload={beforeUpload} fileList={fileList} accept="zip" maxCount={1}>
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>

          {
            (fileList.length === 0 || !address) && (
              <div>
                {
                  (!address) && (
                    <div style={{color: "red"}}>邮箱地址别忘了填写哦，转换结果需要通过邮箱发送</div>
                  )
                }
              </div>
            )
          }
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0 || !address}
            loading={uploading}
            style={{
              marginTop: 16,
            }}
          >
            {uploading ? '正在上传' : '确认上传'}
          </Button>
        </div>
      </section>
      <Bottom />
    </div>
  )
}
