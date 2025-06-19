'use client'

import { useRef } from 'react'
import Title from '@/components/common/Title'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import MobileHistory from '@/components/history/MobileHistory'
import DesktopHistory from '@/components/history/DesktopHistory'
import AdminHistory from '@/components/history/AdminHistory'
import { HistorySection as HistorySectionType } from '@/types/about'
import { motion } from 'framer-motion'

interface HistoryPageProps {
  sections: HistorySectionType[]
  isLoggedIn: boolean
}

const HistoryContent = ({ sections, isLoggedIn }: HistoryPageProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { activeSection, shouldTranslateTOC, sectionRefs, scrollToSection } =
    useScrollObserver(contentRef, {
      threshold: 0.1,
      rootMargin: '-45% 0px -45% 0px',
    })
  console.log(isLoggedIn)
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
      {isLoggedIn ? (
        <AdminHistory
          sections={sections}
          activeSection={activeSection}
          contentRef={contentRef}
          sectionRefs={sectionRefs}
          scrollToSection={scrollToSection}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        <DesktopHistory
          sections={sections}
          activeSection={activeSection}
          contentRef={contentRef}
          sectionRefs={sectionRefs}
          scrollToSection={scrollToSection}
          isLoggedIn={isLoggedIn}
        />
      )}
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
