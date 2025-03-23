'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ImageProps } from 'next/image'

const HeaderImage = ({ src, alt, className, ...props }: ImageProps) => {
  return (
    <div
      className={`relative overflow-hidden w-screen h-[60vh] md:h-[50vh] ${className}`}
    >
      <motion.div
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
        className="relative w-full h-full origin-bottom"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="w-full h-auto object-cover"
          {...props}
        />
      </motion.div>
    </div>
  )
}

export default HeaderImage
