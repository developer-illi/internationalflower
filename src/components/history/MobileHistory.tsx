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
  return (
    <div
      ref={contentRef}
      className={`relative block md:hidden min-h-screen transition-all duration-300 ease-in-out
             ${shouldTranslateTOC ? 'translate-y-[72px]' : 'translate-y-0'}`}
    >
      {/* Mobile TOC */}
      <nav className="container-full bg-background mt-16 sticky top-0 z-40 transition-all duration-300 ease-in-out">
        <div className="w-full flex flex-wrap">
          {sections.map(({ title }) => (
            <button
              key={title + 'mobile'}
              onClick={() => scrollToSection(title + 'mobile')}
              className={`
                    flex-1 text-nowrap px-2 text-base font-bold transition-colors duration-200 text-center
                    hover:text-primary/80 cursor-pointer border-b py-4
                    ${
                      activeSection.includes(title)
                        ? 'text-primary border-primary'
                        : 'text-muted-text border-border'
                    }
                  `}
            >
              {title}
            </button>
          ))}
        </div>
      </nav>

      {sections.map((section) => (
        <div
          key={section.title + 'mobile'}
          id={section.title + 'mobile'}
          ref={(el) => {
            sectionRefs.current[section.title + 'mobile'] = el
          }}
          className="container-layout min-h-screen sm:px-4 pt-16 scroll-mt-0"
        >
          <motion.div
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
        </div>
      ))}
    </div>
  )
}

export default MobileHistory
