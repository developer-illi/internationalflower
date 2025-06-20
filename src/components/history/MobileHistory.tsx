'use client'

import {
  History,
  Information,
  HistorySection as HistorySectionType,
} from '@/types/about'
import { motion } from 'framer-motion'
import InformationSection from '@/components/history/InformationSection'
import HistorySection from '@/components/history/HistorySection'

interface MobileHistoryProps {
  sections: HistorySectionType[]
  activeSection: string
  contentRef: React.RefObject<HTMLDivElement | null>
  shouldTranslateTOC: boolean
  sectionRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>
  scrollToSection: (sectionId: string) => void
}

const MobileHistory = ({
                         sections,
                         activeSection,
                         contentRef,
                         shouldTranslateTOC,
                         sectionRefs,
                         scrollToSection,
                       }: MobileHistoryProps) => {
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      ref={contentRef}
      className={`relative block md:hidden min-h-screen transition-all duration-300 ease-in-out
        ${shouldTranslateTOC ? 'translate-y-[72px]' : 'translate-y-0'}`}
    >
      {/* Mobile TOC - 가로 스크롤 바 */}
      <nav className="w-full overflow-x-auto bg-background mt-16 sticky top-0 z-40">
        <div className="flex w-max space-x-4 px-4 py-3 border-b border-border">
          {sections.map(({ title }) => (
            <button
              key={title + 'mobile'}
              onClick={() => handleScrollToSection(title + 'mobile')}
              className={`
                whitespace-nowrap text-base font-bold transition-colors duration-200
                hover:text-primary/80 cursor-pointer border-b-2 pb-1
                ${
                activeSection.includes(title)
                  ? 'text-primary border-primary'
                  : 'text-muted-text border-transparent'
              }
              `}
            >
              {title}
            </button>
          ))}
        </div>
      </nav>

      {sections.map((section) => (
        <motion.div
          key={section.title + 'mobile'}
          id={section.title + 'mobile'}
          ref={(el) => {
            sectionRefs.current[section.title + 'mobile'] = el
          }}
          className="container-layout min-h-screen sm:px-4 pt-16 scroll-mt-[72px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {section.type === 'information' ? (
            <InformationSection information={section as Information} />
          ) : (
            <HistorySection history={section as History} />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default MobileHistory