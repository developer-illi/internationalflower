'use client'

import { useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import FadeInViewSection from '@/components/motion/FadeInViewSection'
import { MainProject } from '@/types/project'

interface AnimatedRevealProps {
  project: MainProject
  reverse?: boolean
}

// 애니메이션 variants 정의
const revealVariants = {
  initial: { scaleX: 1, scaleY: 0 },
  animate: { scaleX: [1, 1, 0], scaleY: [0, 1, 1] },
  exit: { opacity: 0 },
}

const imageVariants = {
  initial: { opacity: 0, width: '75%' },
}

const textVariants = {
  initial: (reverse: boolean) => ({
    x: reverse ? -50 : 50,
    opacity: 0,
    width: '20%',
  }),
}

const overlayVariants = {
  initial: { opacity: 0 },
}

const ProjectCard = ({ project, reverse = false }: AnimatedRevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { margin: '-100px' })
  const imageControls = useAnimation()
  const textControls = useAnimation()
  const overlayControls = useAnimation()

  const handleHoverStart = async () => {
    await Promise.all([
      textControls.start({
        opacity: 0,
        scaleX: 0,
        transition: { duration: 0, delay: 0 },
      }),
      imageControls.start({
        minWidth: '100%',
        transition: { duration: 0.4, delay: 0, ease: 'easeOut' },
      }),
      overlayControls.start({
        opacity: 1,
        transition: { duration: 0.2, delay: 0.4, ease: 'easeOut' },
      }),
    ])
  }

  const handleHoverEnd = async () => {
    await Promise.all([
      textControls.start({
        scaleX: 1,
        opacity: 1,
        transition: {
          scaleX: { duration: 0.2, delay: 0.4 },
          opacity: { duration: 0.5, delay: 0.6 },
          ease: 'easeInOut',
        },
      }),
      imageControls.start({
        minWidth: 0,
        transition: { duration: 1, delay: 0.1, ease: 'easeOut' },
      }),
      overlayControls.start({
        opacity: 0,
        transition: { duration: 0.3, delay: 0, ease: 'easeInOut' },
      }),
    ])
  }

  const commonTransition = {
    duration: isInView ? 0.5 : 0,
    delay: 0,
    ease: 'easeInOut',
  }

  return (
    <section className="w-full flex justify-center">
      {/* Desktop */}
      <div
        ref={ref}
        className="relative w-full overflow-hidden hidden sm:block"
      >
        <motion.div
          className={`absolute inset-0 bg-muted-background z-10 ${
            reverse ? 'origin-bottom-left' : 'origin-bottom-right'
          }`}
          variants={revealVariants}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          exit="exit"
          transition={{
            duration: isInView ? 1.5 : 0,
            delay: 0,
            ease: 'easeInOut',
          }}
          onAnimationComplete={() => {
            imageControls.start({ opacity: isInView ? 1 : 0 })
            textControls.start({
              x: isInView ? 0 : reverse ? -50 : 50,
              opacity: isInView ? 1 : 0,
            })
          }}
        />
        <motion.div
          className="relative w-full"
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
        >
          <Link
            href={project.href}
            className={`w-full group relative flex gap-x-4 justify-between h-36 transition-all duration-300 ease-in-out ${
              reverse ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <motion.div
              className="relative h-full min-w-0 flex-shrink"
              variants={imageVariants}
              initial="initial"
              animate={imageControls}
              transition={commonTransition}
            >
              <Image
                src={project.image}
                alt={project.title}
                sizes="80vw"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 flex-col justify-center text-center text-white bg-black/40 z-10 flex"
                variants={overlayVariants}
                initial="initial"
                animate={overlayControls}
                transition={commonTransition}
              >
                <p className="text-xl md:text-2xl font-semibold">
                  {project.subTitle}
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold">
                  {project.title}
                </h2>
              </motion.div>
            </motion.div>
            <motion.div
              className={`self-end flex-shrink-0 whitespace-nowrap min-w-fit ${
                reverse ? 'text-right' : 'text-left'
              }`}
              variants={textVariants}
              initial="initial"
              custom={reverse}
              animate={textControls}
              transition={commonTransition}
            >
              <p className="text-sm md:text-base font-semibold">
                {project.subTitle}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold">
                {project.title}
              </h2>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Mobile */}
      <FadeInViewSection>
        <div
          className={`w-screen sm:hidden ${
            reverse ? 'pl-6 text-left' : 'pr-6 text-right'
          }`}
        >
          <Link href={project.href} className="group">
            <div className="relative h-36 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="99vw"
                className="object-cover group-hover:scale-110 transition-all duration-300 ease-in-out"
                priority
              />
            </div>
            <p className="text-xs font-normal mt-4">{project.subTitle}</p>
            <h2 className="text-2xl font-bold">{project.title}</h2>
          </Link>
        </div>
      </FadeInViewSection>
    </section>
  )
}

export default ProjectCard
