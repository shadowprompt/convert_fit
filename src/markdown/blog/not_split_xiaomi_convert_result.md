---
title: '好消息！小米运动健康文件不用分段了'
keywords: 数据过大,记录分段
description: 小米运动健康一次性导出全部的历史运动记录，即使导出的数据过大现在也不需要分段了。
date: 2024-01-07
---

跑友在小米官网申请导出小米数据的时候，点了"确定"导出来的就是小米那边"全量"的数据

![](https://wp-img.daozhao.com/fitconverter/20231229230836.png)

但是这样也给转换工具带来了一个大麻烦，麻烦的地方就是导致导出的csv文件太大了，准确是**XXX_MiFitness_hlth_center_fitness_data.csv**这个文件太大了。

按照转换工具之前的处理方式是不支持这么大的文件转换，当时没有时间深度研究，只好临时采用了手工分段处理的方式，方便跑友能尽早拿到转换结果，详情可以参考[为什么小米运动健康文件可能需要分段](blog/why_split_xiaomi_convert_result)。

周末花费时间研究调试后，迎来了一个好消息，优化了csv文件的处理方式，终于不用分段处理了。以后不用麻烦地手动选取合适的时间点来分段了，转换效率得到了大大提升。
