import Script from 'next/script'
import { Inter } from 'next/font/google'
import './app.scss';

import StyledComponentsRegistry from '../lib/AntdRegistry';
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: '运动记录转换工具 - 华为小米运动记录转换格式工具 && 华为小米运动记录转fit和tcx格式导入高驰佳明工具',
  description: '运动记录转换工具，华为小米运动记录转换格式导入高驰佳明工具',
  keywords: '运动记录转换工具,运动记录格式转换,运动记录导入,华为运动格式转换,小米运动格式转换,运动记录,转换工具,转fit格式,转tcx格式,fit,tcx,华为,小米,高驰,佳明',
  'google-adsense-account': 'ca-pub-3013839362871866',
  manifest: '/manifest.json',
  icons: {
    icon: '/res/drawable-mdpi/ic_shortcut_fit.png',
    shortcut: '/res/drawable-mdpi/ic_shortcut_fit.png',
    apple: '/res/drawable-mdpi/ic_shortcut_fit.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={inter.className}>
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
      <Script>

      </Script>
    </html>
  )
}
