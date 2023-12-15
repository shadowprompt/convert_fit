import Script from 'next/script'
import './app.scss';
import siteConfig from '@/app/siteConfig';
import StyledComponentsRegistry from '../lib/AntdRegistry';

export const metadata = {
  title: `${siteConfig.siteName} - 华为小米运动记录转换格式导入工具 && 华为小米运动记录转fit和tcx格式导入高驰佳明工具`,
  description: '一款运动记录转换导入工具，一款支持将华为小米运动记录转换格式导入高驰佳明工具，它能把华为小米运动记录转fit和tcx格式导入高驰佳明等主流运动平台。',
  keywords: '运动记录转换工具,运动记录格式转换,运动记录导入,华为运动格式转换,小米运动格式转换,华为数据导入高驰,华为数据导入佳明,小米数据导入高驰,小米数据导入佳明,高驰导入佳明,佳明导入高驰,华为运动导出,小米运动导出,zepp数据导出,苹果健康导出,keep数据导入,fit,tcx,gpx',
  'google-adsense-account': 'ca-pub-3013839362871866',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <div className="App">
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </div>
      </body>
      <Script async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3013839362871866"
              crossOrigin="anonymous"></Script>
      <Script charSet="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></Script>
      <Script dangerouslySetInnerHTML={{
        __html: `window.LA?.init({id:"K8VYEj2YzzwEOsl6",ck:"K8VYEj2YzzwEOsl6"})`
      }}></Script>
      <Script dangerouslySetInnerHTML={{
        __html: `var _hmt = _hmt || [];
        (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?cccd115b0d9d9ec40f6222a8f6a35a54";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();`
      }}></Script>
      <Script dangerouslySetInnerHTML={{
        __html: `
        (function(){
        var el = document.createElement("script");
        el.src = "https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?87cfc4e188e48dc1d3fd1d18159ca224bb6224e6ad587d98aa3dfd1eb4ad1fe845f9b46c8c41e6235de98982cdddb9785e566c8c06b0b36aec55fccc04fff972a6c09517809143b97aad1198018b8352";
        el.id = "ttzz";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(el, s);
        })(window);`
      }}></Script>
    </html>
  )
}
