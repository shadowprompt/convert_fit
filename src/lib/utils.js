import * as fs from 'fs';
import * as path from 'path';
const readDir = fs.readdirSync;
const readStat = fs.statSync;

export function getMdList() {
  const mdDir = path.join(process.cwd(), './src/markdown');

  function scanDir(entryPath, parents = [], result = []) {
    const fileReg = /\.md$/;
    const parentStat = readStat(entryPath);

    if (parentStat.isDirectory()) {
      const fileList = readDir(entryPath);
      for (const fileName of fileList) {
        const filePath = path.resolve(entryPath, fileName);
        const fileStat = readStat(filePath);
        if (fileStat.isDirectory()) {
          const nameArr = filePath.replace(/\/$/, '').split(path.sep);
          const entryName = nameArr.pop();
          const dirPaths = [...parents, entryName];
          scanDir(filePath, dirPaths, result);
        } else if (fileReg.test(fileName)) {
          result.push({
            filePath,
            fileName,
            parents,
          });
        }
      }
    }
    return result;
  }

  const list = scanDir(mdDir, []);
  return list .map(item => {
    const paths = item.filePath.split('markdown');
    return {
      ...item,
      pathname: paths[1].replaceAll(path.sep, '/').replace(/\.md$/, ''),
    }
  })
}
// 处理转换记录
export function recordListProcessor(list) {
  return list.map(item => {
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
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// 将数据整理成图表所需的格式
export function chartDataProcessor(list, prop) {
  const dataMap = list.reduce((acc, cur) => {
    const value = cur[prop];
    if (!value) {
      return acc;
    }

    const list = acc[value] || [];
    list.push(cur);

    return {
      ...acc,
      [value]: list,
    };
  }, {});

  const x = Object.keys(dataMap);
  const y  = x.map(item => dataMap[item].length);
  return {
    x,
    y,
    dataMap,
  };
}
