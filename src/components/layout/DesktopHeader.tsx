'use client'

import { useState, useEffect } from 'react'
import { menuItems } from '@/constants/menuItems'
import type { MenuItem } from '@/types/menu'
import Image from 'next/image'
import Link from 'next/link'

const DesktopHeader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const controlHeader = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY
      const scrollingUp = currentScrollY < lastScrollY
      const atTop = currentScrollY === 0

      // 스크롤 방향에 따른 헤더 표시 여부 결정
      if (atTop) {
        setIsVisible(true)
      } else if (scrollingDown) {
        setIsVisible(false)
      } else if (scrollingUp) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    const handleScroll = () => {
      // 디바운스 처리
      clearTimeout(timeoutId)
      timeoutId = setTimeout(controlHeader, 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [lastScrollY])

  return (
    <header
      className={`hidden lg:block fixed top-0 w-full z-50 transition-all duration-300 ease-in-out transform bg-background ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="container-layout py-2">
        <div className="flex justify-between items-start w-full">
          <Link href="/" className="py-2.5 pr-4">
            <Image
              src="/images/logo-light.svg"
              alt="국제꽃예술인협회 로고"
              width={351}
              height={57}
              className="w-auto h-full max-h-9"
              priority
            />
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="group/menu flex">
            {menuItems.map((item: MenuItem) => (
              <li
                key={item.title}
                className="group/item w-[12vw] md:w-[11vw] lg:w-[10vw] xl:w-[9vw] 2xl:w-[8vw] max-w-36 last:min-w-fit"
              >
                <Link
                  href={item.href}
                  className="block cursor-pointer text-base lg:text-lg font-semibold py-4 group-hover/item:text-primary transition-all duration-300 ease-in-out whitespace-nowrap"
                >
                  {item.title}
                </Link>
                {item.subMenu.length > 0 && (
                  <ul
                    className={`overflow-hidden space-y-2 transition-all duration-300 ease-in-out h-0 group-hover/menu:h-40`}
                  >
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.title}>
                        <Link
                          href={subItem.href}
                          className="text-sm font-normal underline-animation hover:text-primary whitespace-nowrap"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default DesktopHeader
