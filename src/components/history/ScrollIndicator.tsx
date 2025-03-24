'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={`hidden md:block fixed left-0 right-0 top-0 h-2 z-40 origin-left bg-primary`}
      style={{
        scaleX,
      }}
    />
  )
}

export default ScrollIndicator
