'use client'

import { useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface DraggableCarouselProps {
  children: React.ReactNode[]
  className?: string
}

const DraggableCarousel = ({ children, className }: DraggableCarouselProps) => {
  const isDraggingRef = useRef(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 50
    const velocity = Math.abs(info.velocity.x)
    const direction = info.velocity.x < 0 ? 1 : -1
    const isValidDirection =
      (direction === 1 && currentIndex < children.length - 1) || // 오른쪽으로 드래그 && 마지막 페이지가 아님
      (direction === -1 && currentIndex > 0) // 왼쪽으로 드래그 && 첫 페이지가 아님

    if (
      (Math.abs(info.offset.x) > threshold || velocity > 500) &&
      isValidDirection
    ) {
      const nextIndex = currentIndex + direction
      setCurrentIndex(nextIndex)
      controls.start({ x: -nextIndex * 100 + '%' })
    } else {
      // 유효하지 않은 방향이거나 충분한 드래그가 아닌 경우 현재 위치로 돌아감
      controls.start({ x: -currentIndex * 100 + '%' })
    }
    isDraggingRef.current = false
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    controls.start({ x: -index * 100 + '%' })
  }

  const handleDragStart = () => {
    isDraggingRef.current = true
  }

  const handleClickCapture = (event: React.MouseEvent) => {
    if (isDraggingRef.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  return (
    <div
      className={`relative w-full select-none overflow-hidden space-y-6 ${className}`}
    >
      <motion.div
        drag="x"
        dragElastic={0.2}
        onClickCapture={handleClickCapture}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ x: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="flex w-full cursor-grab active:cursor-grabbing"
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="relative w-full flex-shrink-0 group"
            style={{ touchAction: 'pan-y pinch-zoom' }}
          >
            <div className="">{child}</div>
          </div>
        ))}
      </motion.div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 pointer-events-auto">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary' : 'bg-primary/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default DraggableCarousel
