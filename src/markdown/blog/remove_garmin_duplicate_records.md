---
title: 怎么批量删除佳明运动记录
keywords: '佳明运动记录,批量删除佳明记录,批量删除重复记录'
description: '上传时提示“此文件已删除”，怎么批量删除这些重复的佳明记录'
date: 2023-12-16
---

有时在向佳明批量导入运动记录的时候，会收到“此文件已上传”的提示，这就是因为这条运动记录已经存在了，需要先删除了才能重新导入。如果记录太多的话手动删除很麻烦，特意准备了一个批量删除教程。

![图片](/content/remove_garmin_duplicate_records/1.png)

出现上述界面后我们就知道哪些记录已经存在了，然后可以借助代码进行批量删除了

### 佳明批量删除旧记录步骤

使用代码

```javascript
function batchDelete() {

    function deDelete(id) {
        const headers = {
            'Authorization': `Bearer 需要被替换`,
            'Di-Backend': 'connectapi.garmin.cn',
            Nk: 'NT',
            'X-App-Ver': '4.71.0.16a',
            'X-Lang': 'zh-CN',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Http-Method-Override': 'DELETE',
        };

        fetch(`https://connect.garmin.cn/activity-service/activity/${id}`, {
            method: 'POST', headers: headers

        }).then(() => {
            console.log(`删除${id}成功！`);
        }).catch(err => {
             console.log(`删除${id}失败 `, err.message);
        })

    }

    const idList = Array.prototype.map.call(document.querySelectorAll('.dzu-dropzone a[class*="ImportDataPageView_link"]'), (item) =>item.href).map(item =>{
        const list = item.split('/');
        return list[list.length - 1];

    })

    idList.forEach((item) =>{
        const ms = Math.random() * 1000 + 2000;
        setTimeout(() =>{
            deDelete(item);
        }, ms)
    })
}

batchDelete();
```

需要把上述代码块中“**需要被替换**”（Bearer及后面的空格保留）替换成自己的这是内容，这个是用来验证登录身份的**凭证**。

### 佳明获取凭证步骤
我们可以参考下图获取它：
（以Chrome为例）

打开浏览器控制台：在浏览器任意页面按快捷键Windows电脑 **Ctrl+Shift+i**，Mac电脑 **Command + shift + i**
**获取**Bearer空格后凭证信息步骤

- 控制台切换至网络（或Network）
- 点击选择任意一条count开头的请求，佳明会隔几秒钟发送一个的，只要位置正确，肯定有的
- 在请求头部分
- 在里面找到左边为Authorization的，它右边的内容就是Bearer XXX了

![图片](/content/remove_garmin_duplicate_records/2.png)

### 佳明执行批量删除运动记录

- 复制Bearer空格后的内容更新至上述代码中，完整的代码形如：

```javascript
function batchDelete() {

    function deDelete(id) {
        const headers = {
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpLW9hdXRoLXNpZ25lci1wcm9kLWNuMS0yMDIzLXEyIn0.eyJzY29wZSI6WyJBVFBfUkVBRCIsIkFUUF9XUklURSIsIkNPTU1VTklUWV9DT1VSU0VfUkVBRCIsIkNPTU1VTklUWV9DT1VSU0VfV1JJVEUiLCJDT05ORUNUX05PTl9TT0NJQUxfU0hBUkVEX1JFQUQiLCJDT05ORUNUX1JFQUQiLCJDT05ORUNUX1dSSVRFIiwiRElWRV9TSEFSRURfUkVBRCIsIkRUX0NMSUVOVF9BTkFMWVRJQ1NfV1JJVEUiLCJHSFNfSElEIiwiR0hTX1JFR0lTVFJBVElPTiIsIkdIU19TQU1EIiwiR09MRl9BUElfUkVBRCIsIkdPTEZfQVBJX1dSSVRFIiwiR09MRl9TSEFSRURfUkVBRCIsIklOU0lHSFRTX1JFQUQiLCJJTlNJR0hUU19XUklURSIsIlBST0RVQ1RfU0VBUkNIX1JFQUQiXSwiaXNzIjoiaHR0cHM6Ly9kaWF1dGguZ2FybWluLmNuIiwiZXhwIjoxNjk1NDI0NDkwLCJpYXQiOjE2OTU0MjA4OTAsImdhcm1pbl9ndWlkIjoiZjcxOTAxMDYtY2MyYi00YjQ4LWI1YjAtMWMwMzliY2FlY2FhIiwianRpIjoiOTU4MWY4MzktZThiNS00NjE2LThhMzUtNTQxYmU0ZDAwZWQ2IiwiY2xpZW50X2lkIjoiQ09OTkVDVF9XRUIiLCJmZ3AiOiJkZGI1NWM5ZDg0ZGE0YTc1OTcxMjdkZThlNGE5MzIwNTk1MTAyODc5MmQ1OTRhMTEzYWM0MTJiNmEwZDkyMGNiIn0.YPa22wlbqH36n50me4FTk4pdcn-VcknNuLHBBfMdeP_WF1yxt_bN_m9p__-IYQNdwhf7GKpEsOzw5Td1osPFiifCpKgs_JS7Bgd2DEBIBro7BrJmpuNWH6xqzSOx9OydaWQ74xVkttxxTzl6xj-heZHdkm5SZLlwtbUx9Ks2AVTiG6CEKi6O1JGR6Kl50e9V2abkJagN4ENcakIjLVEtXLtwrfA3Q_VyE7q0oBz42a3ivDxsSWtB4Yqz6akP5Y-Oo-3x-ESz2t7bP1N0y12H0OnwKeizVp9KTFO1YQLofEOi72EFQvJpG17M50QyuK6hdUClXq9C_KUYpavaueVohg`,
            'Di-Backend': 'connectapi.garmin.cn',
            Nk: 'NT',
            'X-App-Ver': '4.71.0.16a',
            'X-Lang': 'zh-CN',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Http-Method-Override': 'DELETE',
        };

        fetch(`https://connect.garmin.cn/activity-service/activity/${id}`, {
            method: 'POST', headers: headers

        }).then(() => {
            console.log(`删除${id}成功！`);
        }).catch(err => {
             console.log(`删除${id}失败 `, err.message);
        })

    }

    const idList = Array.prototype.map.call(document.querySelectorAll('.dzu-dropzone a[class*="ImportDataPageView_link"]'), (item) =>item.href).map(item =>{
        const list = item.split('/');
        return list[list.length - 1];

    })

    idList.forEach((item) =>{
        const ms = Math.random() * 1000 + 2000;
        setTimeout(() =>{
            deDelete(item);
        }, ms)
    })
}

batchDelete();
```

- 在控制台粘贴完整代码并直接回车

![图片](/content/remove_garmin_duplicate_records/3.png)


- 这时你就能看到是否删除成功了

![图片](/content/remove_garmin_duplicate_records/4.png)


- 现在就把之前上传的可能有误的记录给删掉了，点击此文件已上传旁边的查看详情就会出现如下页面了。

![图片](/content/remove_garmin_duplicate_records/5.jfif)


为了避免混淆，重新刷新下佳明的导入数据页面，再次导入转换结果即可。

大功告成了。
