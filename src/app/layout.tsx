import GlobalErrorBoundary from '@/components/error/GlobalErrorBoundary'
import { ifaMetadata } from '@/constants/metadata'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import '@/styles/globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(ifaMetadata.siteUrl),
  title: ifaMetadata.title,
  description: ifaMetadata.description,

  icons: {
    icon: '/favicon/favicon.png',
  },

  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: ifaMetadata.siteUrl,
    siteName: ifaMetadata.title,
    description: ifaMetadata.description,
    images: [
      {
        url: '/open-graph-800x600.png',
        width: 800,
        height: 600,
      },
      {
        url: '/open-graph-1200x630.png',
        width: 1200,
        height: 630,
      },
      {
        url: '/open-graph-1800x1600.png',
        width: 1800,
        height: 1600,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${openSans.variable} font-sans antialiased`}>
        <GlobalErrorBoundary>{children}</GlobalErrorBoundary>
      </body>
    </html>
  )
}
