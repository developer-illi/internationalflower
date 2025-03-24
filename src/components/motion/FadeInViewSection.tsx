'use client'

import { PropsWithChildren, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

const FadeInViewSection = ({
  children,
  delay = 0,
}: PropsWithChildren<{ delay?: number }>) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    margin: '-50px',
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 })
    } else {
      controls.start({ opacity: 0, y: 50 })
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

export default FadeInViewSection
