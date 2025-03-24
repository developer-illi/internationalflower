import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import '@/styles/globals.css'
import DesktopHeader from '@/components/layout/DesktopHeader'
import MobileHeader from '@/components/layout/MobileHeader'
import Footer from '@/components/layout/Footer'

const openSans = Open_Sans({
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${openSans.variable} font-sans antialiased`}>
        <main className="min-h-screen w-full">{children}</main>
      </body>
    </html>
  )
}
