import '@/styles/globals.css'
import DesktopHeader from '@/components/layout/DesktopHeader'
import MobileHeader from '@/components/layout/MobileHeader'
import Footer from '@/components/layout/Footer'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
      <main>{children}</main>
      <Footer />
    </>
  )
}
