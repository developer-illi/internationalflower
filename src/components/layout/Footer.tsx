import Image from 'next/image'
import Link from 'next/link'
import Instagram from '@/assets/instagram.svg'
import Blog from '@/assets/blog.svg'
import { getBaseInformation } from '@/api/about'

const Footer = async () => {
  const association = await getBaseInformation().catch((_error) => {
    return {
      name: '',
      instagram: '',
      blog: '',
      address: '',
    }
  })

  return (
    <footer className="bg-foreground text-background py-12 cursor-default">
      <div className="container-layout">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div className="space-y-8 lg:space-y-4">
            <div className="flex items-center space-x-6">
              <Link
                href={association.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center space-x-2 font-bold text-sm lg:text-base hover:text-gray-300 transition-colors"
              >
                <Instagram />
                <span>INSTAGRAM</span>
              </Link>
              <Link
                href={association.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center space-x-2 font-bold text-sm lg:text-base hover:text-gray-300 transition-colors"
              >
                <Blog />
                <span>BLOG</span>
              </Link>
            </div>

            <section className="space-y-2 text-xs lg:text-sm">
              <div className="flex items-start sm:items-center gap-2 flex-col sm:flex-row">
                <p>{association.name}</p>
                <p className="hidden sm:block">|</p>
                <address className="not-italic">{association.address}</address>
              </div>
              <p>IFA All rights reserved.</p>
            </section>
          </div>

          <div className="order-first mb-8 lg:order-last lg:mb-0">
            <Image
              src="/images/logo-dark.svg"
              alt="국제꽃예술인협회 로고"
              width={180}
              height={60}
              className="object-contain w-auto h-full max-h-7 lg:max-h-8"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
