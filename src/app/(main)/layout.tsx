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
    <div className="flex flex-col min-h-screen">
      <DesktopHeader />
      <MobileHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}