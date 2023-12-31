---
title: 什么是兜底的运动类型
keywords: 运动类型,复合运动,综合运动
description: 让一些小众或者暂时不知道明确运动类型（比如羽毛球、跳绳等）记录能够成功导入到高驰、佳明等平台。
date: 2024-01-03
---

每个待导入的运动记录都需要指定一个运动类型，方便平台（高驰、佳明等）来识别出这条记录是跑步的，还是骑行的，还是游泳的，还是其他的运动类型。

但是有些运动类型，比如格斗等，目前高驰就没有对应的运动类型，这时候就需要使用兜底的运动类型了，将该条格斗类型的运动记录改成兜底类型，这样虽然不太准确，但是好歹能够导入进去并且能显示基本数据，导入失败好很多。

还有一些原始运动数据的运动类型，在转换的时候并不能明确识别出来（因为华为运动健康、小米运动健康并没有文档告知每个具体类型数字代表的什么类型的运动），这时候也需要使用兜底的运动类型了。

![运动类型](https://wp-img.daozhao.com/fitconverter/sport_types_example.png)

上面文件夹的类型是根据华为的记法来命名，但是运动类型太多了，比如红框里面的运动类型我就不知道在华为里面它是什么类型的运动，所以为了让它们能成功导入就需要使用兜底的运动类型了。

实测发现高驰、佳明对“综合运动”这一兜底类型的支持好像还不太一样，只好根据实际导入的目标来区分下，不同平台使用不同的兜底类型。
具体的信息如下：

| 平台     | 运动类型名称 | 运动类型 | 子运动类型 |
|--------|--------|------|-------|
| 高驰     | 健身     | 10   | 26    |
| 佳明     | 复合运动   | 18   | 0     |
| Strava | 复合运动   | 18   | 0     |
| RQrun  | 健身     | 10   | 26    |

一些不支持、不知道准确运动类型或者不好区分的运动类型，都是用上述运动类型兜底。
