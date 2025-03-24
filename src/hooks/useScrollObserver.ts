import { useState, useEffect, useRef, RefObject } from 'react'

interface ScrollObserverOptions {
  threshold?: number
  rootMargin?: string
}

interface SectionRefs {
  [key: string]: HTMLDivElement | null
}

/**
 * 스크롤 위치에 따라 현재 활성화된 섹션을 감지하고 TOC 표시 여부를 제어하는 커스텀 훅
 * @param contentRef 콘텐츠 영역의 ref
 * @param options IntersectionObserver 옵션
 * @returns 활성 섹션, TOC 표시 여부, 섹션 refs 객체, 섹션으로 스크롤하는 함수
 */
export function useScrollObserver(
  contentRef: RefObject<HTMLDivElement | null>,
  options: ScrollObserverOptions = {},
) {
  const [activeSection, setActiveSection] = useState('')
  const [shouldTranslateTOC, setShouldTranslateTOC] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const sectionRefs = useRef<SectionRefs>({})

  // Mobile TOC 위치 제어
  useEffect(() => {
    const controlToc = () => {
      const currentScrollY = window.scrollY
      const contentTop = contentRef.current?.getBoundingClientRect().top ?? 0

      if (contentTop > 100) {
        setShouldTranslateTOC(false)
        setLastScrollY(currentScrollY)
        return
      }

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setShouldTranslateTOC(false)
      } else {
        setShouldTranslateTOC(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlToc)
    return () => window.removeEventListener('scroll', controlToc)
  }, [lastScrollY, contentRef])

  // 섹션 감지를 위한 IntersectionObserver 설정
  useEffect(() => {
    const { threshold = 0.001, rootMargin = '-45% 0px -45% 0px' } = options

    const observer = new IntersectionObserver(
      (entries) => {
        // 현재 화면에 가장 많이 보이는 섹션 찾기
        const visibleSection = entries.reduce((maxEntry, entry) => {
          if (!maxEntry) return entry

          // IntersectionRatio가 더 큰 섹션을 선택
          return entry.intersectionRatio > maxEntry.intersectionRatio
            ? entry
            : maxEntry
        }, null as IntersectionObserverEntry | null)

        // if (visibleSection && visibleSection.isIntersecting) {
        //   setActiveSection(visibleSection.target.id)
        // }
        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      {
        root: null,
        threshold,
        rootMargin,
      },
    )

    // 각 섹션을 관찰 대상으로 등록
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // 컴포넌트 언마운트 시 observer 정리
    return () => observer.disconnect()
  }, [options])

  // 목차 클릭 시 해당 섹션으로 스크롤
  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return {
    activeSection,
    shouldTranslateTOC,
    sectionRefs,
    scrollToSection,
  }
}
