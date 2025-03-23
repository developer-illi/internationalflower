'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col items-center relative overflow-x-hidden">
      <div className="container-layout flex items-end justify-start w-full h-[33.3vh] min-h-56">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-head-copy font-bold relative z-10"
        >
          INTERNATIONAL
          <br />
          FLORISTS ASSOCIATION
        </motion.h1>
      </div>
      <motion.div
        initial={{ scale: 1.5 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.45, 0, 0.55, 1],
          delay: 0.5,
        }}
        className="relative w-screen flex-1 origin-bottom"
      >
        <Image
          src="/images/hero.png"
          alt="메인 이미지"
          fill
          sizes="150vw"
          className="object-cover w-full h-full"
          priority
        />
      </motion.div>
    </section>
  )
}

export default HeroSection
