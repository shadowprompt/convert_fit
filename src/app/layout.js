import Script from 'next/script'
import './app.scss';
import { commonSeoData } from '@/app/siteConfig';
import StyledComponentsRegistry from '../lib/AntdRegistry';

export const metadata = {
  ...commonSeoData,
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
      <Script dangerouslySetInnerHTML={{
        __html: `!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"K8VYEj2YzzwEOsl6",ck:"K8VYEj2YzzwEOsl6"});`
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
      <Script dangerouslySetInnerHTML={{
        __html: `
        (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "kdxc812n25");`
      }}></Script>
    </html>
  )
}
