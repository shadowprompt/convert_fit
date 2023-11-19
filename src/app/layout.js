import { Inter } from 'next/font/google'
import './app.scss';

import StyledComponentsRegistry from '../lib/AntdRegistry';
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: '运动记录转换工具 - 华为小米运动记录转换格式工具 && 华为小米运动记录转fit和tcx格式导入高驰佳明工具',
  description: '运动记录转换工具，华为小米运动记录转换格式导入高驰佳明工具',
  keywords: '运动记录转换工具,运动记录格式转换,运动记录导入,华为运动格式转换,小米运动格式转换,运动记录,转fit格式,转tcx格式,fit,tcx,华为,小米,高驰,佳明'
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="App">
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </div>
      </body>
    </html>
  )
}
