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
