import { NextResponse } from "next/server";
const { dLog, nodeStore } = require('@daozhao/utils');
const multer = require('multer');
const fs = require('fs');
const {mkdirsSync, checkLock, releaseLock, setLock} = require("../../node/tools");

const localStorage = nodeStore('../localStorage/bundless_fit');
mkdirsSync('/tmp/fit_upload_temp');
const huaweiHandler = require('../../node/huaweiHandler');
const zeppHandler = require('../../node/zeppHandler');
const upload = multer({ dest: '/tmp/fit_upload_temp/' });
export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET(request) {
  const data = {
    name: 'Bishal Shrestha',
    age: '27'
  }

  return NextResponse.json({data})
}


export async function POST(req, res) {
  return upload.array('zip_file', 1)(req, res, () => uploadHandler(req, res));
}

async function uploadHandler(req, res) {
  const requestBody = {};
  const formData = await req.formData();
  console.log('requestBody ~ ', new Date());

  const address = formData.get('address');
  const type = formData.get('type');
  const ts = Date.now();
  const fileName = 'fit_' + ts;
  dLog('log upload ', fileName, `[${address} ${type}]` );
  // code -1:有任务正在执行 1:预检通过 0:预检不通过
  if (checkLock()) {
    return NextResponse.json({
      code: -1,
    });
  } else {
    setLock(`[${address} ${type}] ${new Date().toString()}`);
  }

  let prevList = localStorage.getItem('list') || '[]';
  prevList = JSON.parse(prevList);
  localStorage.setItem('list', JSON.stringify([
    ...prevList,
    {
      address,
      type,
      fileName,
      ts,
    }
  ]));
  mkdirsSync('/tmp/fit_upload_temp');

  const file = formData.get('zip_file');
  if(file && file.size === 0){
    //使用同步方式删除一个文件
    fs.unlinkSync(file.path);
    dLog("successfully removed an empty file");
  }else{
    const originalName = file.originalname || '';
    const list = originalName.split('.');
    const ext = list[list.length - 1];
    const baseFilePath = `/tmp/fit_upload`;
    mkdirsSync(baseFilePath);
    // const targetPath= `${baseFilePath}/${fileName}.${ext}`;
    const targetPath= `${baseFilePath}/${fileName}.zip`;
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(targetPath, buffer, (err) => {
      console.log('333 ~ ', err);
    })
    //使用同步方式重命名一个文件
    // fs.renameSync(file.path, targetPath);
    dLog('log rename success ', file.path, targetPath, `[${address} ${type}]` );
    const handler = type === 'huawei' ? huaweiHandler : zeppHandler;
    // 根据preCheck是否返回目录结果开判断压缩包的内容是否正确
    const dirs = await handler.preCheck(targetPath);

    dLog('log preCheck ', dirs ? 'success': 'fail', file.path, file.size, targetPath, `[${address} ${type}]` );
    // 预检通过则直接进行解析流程
    if (dirs) {
      const baseUrl = `https://convert.fit/fit_upload/${fileName}`;

      handler.parser({
        data: {
          requestBody: {
            info: {
              address,
              type,
              baseFilePath,
              filePath: targetPath,
              baseUrl,
              fileName,
            }
          },
          dirs,
        }
      })
    } else {
      releaseLock();
    }

    return NextResponse.json({
      code: dirs ? 1 : 0,
    });
  }
  return NextResponse.json({
    code: 22,
  });
}
