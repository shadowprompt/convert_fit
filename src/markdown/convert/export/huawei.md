---
title: 华为运动记录导出
description: '华为官方开放了数据副本导出入口，选择其中的运动健康，通过信息验证后就可以设置数据包密码申请导出了，等待大概7天就能收到通知，下载下来压缩包，然后凭密码解压即可。'
keywords: '华为运动健康导出,华为运动健康导入高驰佳明,华为运动健康tcx,华为运动健康fit,华为运动健康导入华为,华为运动健康导入RQrun,华为运动健康导入数据'
date: 2023-07-16
---
### 数据导出路径
先从华为官方申请导出数据 [链接](https://privacy-cn.consumer.huawei.com/privacycenter/index.html?lang=zh-cn&themeName=blue&backUrl=https://privacy-cn.consumer.huawei.com/privacycenter/service/pindex.html%3Flang%3Dzh-cn%26themeName%3Dblue&countryCode=CN#/Home?lang=zh-cn)，点击获取您的数据副本，经过四重验证之后，就可以申请导出了。


![图片](/content/huawei/1.png)

![图片](/content/huawei/2.png)

我们可以看到华为系所有支持用户导出数据的APP列表，列表还是有点长的。

![图片](/content/huawei/3.png)

在上述列表里面找到“运动健康”，我们仅用导出它的数据即可。

![图片](/content/huawei/4.png)

就开始漫长的等待了，我上次用了7天。

等收到短信通知说之前请求的数据已可供下载之后，类似的步骤进去就可以看到下载入口了。

![图片](/content/huawei/5.png)

最后拿到的数据解压是这样的

![图片](/content/huawei/6.png)

我们导出需要的数据就是图中选中的**motion path detail data.json**文件，我们的运动记录都在里面，文件可能比较大。

里面每次的运动记录，每条记录的数据还是挺全的，粒度比小米运动详细太多了，好多记录都是一秒一个数据点，有常见的心率、步频、经纬度，卡路里等基础信息，我们可以据此推算出最大心率，平均心率，最大步频，平均步频等信息，里面也有一些类似每公里配速之类的信息。

平时在运动平台里面展示的图表就得依靠这些数据了，信息越多，曲线越浓密。

拿到数据是json格式，不是主流运动平台使用的tcx或者fit格式，这个就需要转换下了，可以参看我发的华为、小米运动记录转fit和tcx格式工具转换效果展示及使用教程。

### 总结
- 华为运动健康官方导出的数据细节很齐全，转换后效果不错
- 但是官方默认只能导出近1年的记录数据，向官方申请后，最多可导出近5年的，建议定期导出并转换留存。
