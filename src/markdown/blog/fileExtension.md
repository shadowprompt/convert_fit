---
title: 常见运动记录格式
keywords: tcx文件,fit文件,gpx文件,csv文件,json文件,tcx,fit,gpx,csv,json,运动记录
date: 2023-12-16
---

随着可穿戴设备的发展，以及手机厂商也进入了运动健康领域，目前市面上的运动记录的文件格式还不少。

### tcx文件
TCX是Training Center XML的简称，TCX文件是一种数据交换格式，用于在健身设备之间共享数据。它于 2008 年与 Garmin 的培训中心产品一起推出。心率、跑步节奏、自行车节奏、卡路里和单圈时间等锻炼数据以 XML 格式存储在 TCX 文件中。此外，有关锻炼轨迹的摘要数据也包含在 TCX 文件中。 TCX 文件类似于Garmin为运动可穿戴设备创建的 FIT 文件。

#### 文件示例
```
<?xml version="1.0" encoding="UTF-8"?>
<TrainingCenterDatabase xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd" xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1" xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2" xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2" xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns4="http://www.garmin.com/xmlschemas/ProfileExtension/v1">
 <Activities>
  <Activity Sport="Running">
   <Id>2023-11-17T21:37:07Z</Id>
   <Lap StartTime="2023-11-17T21:37:07Z">
    <TotalTimeSeconds>339</TotalTimeSeconds>
    <DistanceMeters>1000</DistanceMeters>
    <Intensity>Active</Intensity>
    <TriggerMethod>Manual</TriggerMethod>
    <MaximumHeartRateBpm>
     <Value>149</Value>
    </MaximumHeartRateBpm>
    <AverageHeartRateBpm>
     <Value>133</Value>
    </AverageHeartRateBpm>
    <Track>
      <Trackpoint>
      <Time>2023-11-17T23:24:02Z</Time>
      <Position>
       <LatitudeDegrees>37.00000</LatitudeDegrees>
       <LongitudeDegrees>122.00000</LongitudeDegrees>
      </Position>
      <AltitudeMeters>0</AltitudeMeters>
      <HeartRateBpm>
       <Value>153</Value>
      </HeartRateBpm>
      <Cadence>96</Cadence>
     </Trackpoint>
    </Track>
   </Lap>
   <Creator>
    <Name>Coros Wearables</Name>
   </Creator>
  </Activity>
 </Activities>
</TrainingCenterDatabase>
```
#### 特点
tcx推出的时间较早，目前主流的运动平台除了支持最新的fit格式外，还在兼容这种tcx格式，华为运动健康甚至只支持这种格式。
文件内容是xml格式，打开后普通用户也能看懂，在熟悉格式后可以篡改数据。
缺点是扩展性有限，相比后面的推出fit格式文件文件占用较大

### fit文件
FIT是Flexible and Interoperable Data Transfer的简称，FIT文件是由 Garmin 运动可穿戴设备创建的 GIS 文件。它用于记录当他/她穿着这些设备移动时的活动。活动数据包括 GPS 设备记录的位置和时间。 FIT 文件还用于使用 Web API 传输记录的活动数据。这就是 FIT 文件是与其他健身平台共享健身数据最常用的文件格式的原因。

#### 特点
fit目前逐渐成为主流的运动平台支持的首选格式，因为它支持跨平台，向前兼容，扩展性强。它是以二进制文件形式保存，占用空间少，普陀用户无法直接打开或者打开后显示"乱码"，查看和修改文件内容门槛较高。


#### 文件示例
```
0e20 8208 d98a 0300 2e46 4954 bbaa 4000
0000 0005 0001 0001 0284 0404 8602 0284
080d 0700 0426 0134 4c0d 3f22 0343 4f52
4f53 2050 4143 4520 3200 4000 00cf 0003
0202 8403 0102 0110 0d00 2601 0000 0000
0000 0000 0000 0000 0000 0000 4740 0000
1700 03fd 0486 0202 841b 0d07 0034 4c0d
3f26 0143 4f52 4f53 2050 4143 4520 3200
```

### gpx文件
带有 GPX 扩展名的文件代表 GPS 交换格式，用于在 Internet 上的应用程序和 Web 服务之间交换 GPS 数据。它是一种轻量级的 XML 文件格式，包含 GPS 数据，即要由多个程序导入和红色的航路点、路线和轨迹。 GPX 文件格式是开放的，并受到各种应用程序和 GPS 设备的支持。可以加载来自此类文件的 GPS 数据，以在地图应用程序上显示以用于地理空间目的。

#### 特点
主要是包含轨迹、路程的GPS信息，没有运动记录相关的心率、步频、步幅的，对跑着而言用处不大。

### csv文件
没有具体的标准，各家想怎么写就怎么写，缺点是各家都不兼容，相互导入就需要转换。
目前的典型的使用方就是小米运动健康

```
date	time	heartRate
2016/8/21	23:37	75
2016/8/21	23:39	65
```

### json文件
跟上面的csv格式类似，没有具体的标准，各家想怎么写就怎么写，缺点是各家都不兼容，相互导入就需要转换。
目前的典型的使用方就是华为运动健康

```json
[{"totalSteps":3900,"recordId":"2WNXMQAAAAACAAAACJ4ESIQBAAA=","totalStoreys":0,"dataId":0,"appType":1,"vendor":"ios","partTimeMap":{"2.0":802.0,"3.0":1194.0,"1.0":406.0},"abnormalTrack":0,"realStoreys":0,"startTime":1667655573000,"attribute":"HW_EXT_TRACK_DETAIL@istp=lbs;k=0;lat=23.729742;lon=106.919210;alt=110.807605;t=1667655574000;\ntp=lbs;k=1;lat=23.729826;lon=106.919168;alt=110.885326;t=1667655578000;\ntp=lbs;k=2;lat=23.729916;lon=106.919086;alt=111.271100;t=1667655583000;\ntp=lbs;k=3;lat=23.729997;lon=106.919025;alt=111.568069;t=1667655586000;\ntp=lbs;k=4;lat=23.730094;lon=106.919016;alt=111.491731;t=1667655590000;\ntp=lbs;k=5;lat=23.730144;lon=106.919111;alt=111.423571;t=1667655594000;\ntp=lbs;k=6;lat=23.730182;lon=106.919219;alt=111.451134;t=1667655597000;\ntp=lbs;k=7;lat=23.730263;lon=106.919321;alt=111.410306;t=1667655600000;\ntp=lbs;k=8;lat=23.730327;lon=106.919397;alt=111.247796;t=1667655603000;\ntp=lbs;k=9;lat=23.730387;lon=106.919504;alt=110.863578;t=1667655608000;\ntp=lbs;k=10;lat=23.730443;lon=106.919601;alt=110.677737;"}]
```

### 总结
我们平时看到的运动软件里面有运动轨迹、配速、步幅、步频、心率、卡路里、海拔曲线，要想划出这些曲线，就需要有支撑它的基础数据，核心就是时间点，以及当时的gps、步频、心率、卡路里、海拔等信息，然后我们可以根据距离汇总出单圈（1公里）的配速、平均步频、平均步幅等信息

