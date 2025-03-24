'use client'

import { useRef } from 'react'
import Title from '@/components/common/Title'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import MobileHistory from '@/components/history/MobileHistory'
import DesktopHistory from '@/components/history/DesktopHistory'
import { HistorySection as HistorySectionType } from '@/types/about'
import { motion } from 'framer-motion'

interface HistoryPageProps {
  sections: HistorySectionType[]
}

const HistoryContent = ({ sections }: HistoryPageProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { activeSection, shouldTranslateTOC, sectionRefs, scrollToSection } =
    useScrollObserver(contentRef, {
      threshold: 0.1,
      rootMargin: '-45% 0px -45% 0px',
    })

  if (!sections) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="my-40"
    >
      <Title title="연혁" className="container-layout" />

      {/* Desktop */}
      <DesktopHistory
        sections={sections}
        activeSection={activeSection}
        contentRef={contentRef}
        sectionRefs={sectionRefs}
        scrollToSection={scrollToSection}
      />

      {/* Mobile */}
      <MobileHistory
        sections={sections}
        activeSection={activeSection}
        contentRef={contentRef}
        shouldTranslateTOC={shouldTranslateTOC}
        sectionRefs={sectionRefs}
        scrollToSection={scrollToSection}
      />
    </motion.div>
  )
}

export default HistoryContent
