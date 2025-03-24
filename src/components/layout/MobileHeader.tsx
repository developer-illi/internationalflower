'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { menuItems } from '@/constants/menuItems'
import Accordion from '@/components/common/Accordion'

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
        document.body.style.overflow = 'unset'
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const controlHeader = () => {
      if (isOpen) return

      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlHeader)
    return () => window.removeEventListener('scroll', controlHeader)
  }, [lastScrollY, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <header
      className={`lg:hidden fixed inset-x-0 z-50 transition-all duration-300 ease-in-out transform bg-background ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isOpen ? 'inset-y-0' : 'top-0 h-[72px]'}`}
    >
      <div className="container-layout h-[72px]">
        <div className="flex justify-between items-center h-full">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/images/logo-light.svg"
              alt="국제꽃예술인협회 로고"
              width={351}
              height={57}
              className="w-auto h-full max-h-7 sm:max-h-8"
              priority
            />
          </Link>
          <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="container-layout overflow-y-auto h-[calc(100%-72px)]">
          <ul className="py-4 space-y-8">
            {menuItems.map((item) => (
              <li key={item.title}>
                {item.subMenu.length > 0 ? (
                  <Accordion title={item.title}>
                    <ul className="mt-6 space-y-6">
                      {item.subMenu.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            className="group block"
                            onClick={() => setIsOpen(false)}
                          >
                            <p className="w-fit underline-animation text-md text-foreground group-hover:text-primary transition-all duration-300">
                              {subItem.title}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Accordion>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-xl font-semibold hover:text-primary transition-all duration-300 ease-in-out whitespace-nowrap"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default MobileHeader
