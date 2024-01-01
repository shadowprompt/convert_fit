import { promises as fsp } from 'fs';
import path from 'path';
import fm from 'front-matter';
import { parse } from 'marked';
import * as dateformat from './dateformat';
const fileExt = 'md';
const slugMap = {
  'blog/bindAndImport': 'blog/huawei_sync_to_keep',
  'blog/fileExtension': 'blog/sport_record_file_extension',
  'blog/whyConvert': 'blog/meaning_of_converter',
  'blog/xiaomi_give_up_export_time_range': 'blog/why_split_xiaomi_convert_result',
}

/**
 * 尝试映射新的slug
 * @param oldList
 * @returns {*}
 */
function getSlugMapping(oldList) {
  const pathname = oldList.join('/');
  const target = slugMap[pathname];
  if (target) {
    console.log('slugMapping ~ ', pathname, ' => ', target);
    return target.split('/');
  }
  return oldList;
}

// return absolute path to folder
function absPath(dir) {
  return (
    path.isAbsolute(dir) ? dir : path.join(process.cwd(), './src/markdown', dir)
  );
}
// return array of files by type in a directory and remove extensions
export async function getFileIds(dir = './') {
  const loc = absPath(dir);
  const files = await fsp.readdir(loc);
  return files
    .filter((fn) => path.extname(fn) === `.${fileExt}`)
    .map((fn) => path.basename(fn, path.extname(fn)));
}

export async function getFileData(slug, dir = './') {
  const originalSlugList = Array.isArray(slug) ? slug : [slug];
  const slugList = getSlugMapping(originalSlugList);
  // 最后一项为文件名，其余是目录名
  const rawId = slugList.pop() || '';
  let id = rawId || 'index'; // 为空时默认为 index
  let dirPath  = dir;
  if (slugList.length > 0) {
    dirPath += slugList.join('/') + '/';
  }
  // dirPath可能以./开头，需要去掉.
  const pathname = dirPath.replace(/^(\.)/, '') + rawId;
  let file = path.join(absPath(dirPath), `${id}.${fileExt}`);
  let stat = await fsp.stat(file).catch(err => {
    console.log('fsp.stat 1~ ', err + '');
  });
  // 尝试将原id作为目录名，读取其index.md
  if (!stat) {
    dirPath = dirPath + '/' + id;
    id = 'index';
    file = path.join(absPath(dirPath), `${id}.${fileExt}`);
  }
  stat = await fsp.stat(file).catch(err => {
    console.log('fsp.stat 2~ ', err + '');
  });
  // 文件不存在直接返回空对象
  if (!stat) {
    return {
      title: '当前URL不存在',
      html: `<section><p>请确认当前页面的URL是否有误</p><p>记录时间：${new Date()}</p></section>`,
    };
  }

  const data = await fsp.readFile(file, 'utf8');
  const matter = fm(data);
  const html = (await parse(matter.body)).toString();
  // date formatting
  // matter.attributes.date最好用new Date包裹一层，避免填写不完整（如2024-1-1并非标准的2024-01-01）导致返回的是string并非Date
  const date = matter.attributes.fakeAsUpdateDaily
    ? new Date()
    : new Date((matter.attributes.date || stat.ctime));
  matter.attributes.date = date.toUTCString();
  matter.attributes.dateYMD = dateformat.ymd(date);
  matter.attributes.dateFriendly = dateformat.friendly(date);
  // word count
  const
    roundTo     = 10,
    readPerMin  = 200,
    numFormat   = new Intl.NumberFormat('en'),
    count       = matter.body.replace(/\W/g, ' ').replace(/\s+/g, ' ').split(' ').length,
    words       = Math.ceil(count / roundTo) * roundTo,
    mins        = Math.ceil(count / readPerMin);
  matter.attributes.wordcount = `${ numFormat.format(words) } words, ${ numFormat.format(mins) }-minute read`;
  return {
    pathname,
    id,
    html,
    ...matter.attributes
  };
}
