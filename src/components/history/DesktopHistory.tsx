'use client'

import {
  History,
  Information,
  HistorySection as HistorySectionType,
} from '@/types/about'
import { motion } from 'framer-motion'
import InformationSection from '@/components/history/InformationSection'
import HistorySection from '@/components/history/HistorySection'
import ScrollIndicator from './ScrollIndicator'

interface DesktopHistoryProps {
  sections: HistorySectionType[]
  activeSection: string
  contentRef: React.RefObject<HTMLDivElement | null>
  sectionRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>
  scrollToSection: (sectionId: string) => void
}

const DesktopHistory = ({
  sections,
  activeSection,
  contentRef,
  sectionRefs,
  scrollToSection,
}: DesktopHistoryProps) => {
  return (
    <div className="hidden container-layout md:flex flex-row md:pt-20 gap-x-8">
      {/* Desktop TOC */}
      <nav className="w-64 flex-shrink-0">
        <div className="sticky top-32 h-fit space-y-8 pr-6">
          {sections.map(({ title }) => (
            <button
              key={title + 'desktop'}
              onClick={() => scrollToSection(title + 'desktop')}
              className={`
                  text-4xl font-black transition-colors duration-200 w-full text-left
                  hover:text-primary/80 cursor-pointer
                  ${
                    activeSection.includes(title)
                      ? 'text-primary'
                      : 'text-muted-text'
                  }
                `}
            >
              {title}
            </button>
          ))}
        </div>
      </nav>

      <ScrollIndicator />

      {/* Contents */}
      <div
        ref={contentRef}
        className="flex-1 md:border-l md:pl-16 border-border transition-all duration-300 ease-in-out"
      >
        {sections.map((section) => (
          <div
            key={section.title + 'desktop'}
            id={section.title + 'desktop'}
            ref={(el) => {
              sectionRefs.current[section.title + 'desktop'] = el
            }}
            className="min-h-screen h-fit px-4 pt-16 md:pt-0 scroll-mt-32 pb-40 z-10"
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
    </div>
  )
}

export default DesktopHistory
