'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import ChevronLeft from '@/assets/chevron-left.svg'

interface ControllableCarouselProps {
  imageUrls: string[]
  className?: string
}

const ControllableCarousel = ({
  imageUrls,
  className,
}: ControllableCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const isFirstImage = currentIndex === 0
  const isLastImage = currentIndex === imageUrls.length - 1

  const goToPrevious = useCallback(() => {
    if (isTransitioning || isFirstImage) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => prevIndex - 1)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning, isFirstImage])

  const goToNext = useCallback(() => {
    if (isTransitioning || isLastImage) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => prevIndex + 1)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning, isLastImage])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX
      const distance = touchStartX - touchEndX
      if (Math.abs(distance) > 50) {
        if (distance > 0 && !isLastImage) {
          goToNext()
        } else if (distance < 0 && !isFirstImage) {
          goToPrevious()
        }
      }
      setTouchStartX(null)
    }
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative flex w-full h-full justify-between gap-x-12 xl:gap-x-48 ${className}`}
    >
      <button
        type="button"
        disabled={isTransitioning || isFirstImage}
        onClick={goToPrevious}
        className={`group text-foreground cursor-pointer disabled:cursor-default ${
          isFirstImage ? 'opacity-40' : 'opacity-100'
        }`}
      >
        <ChevronLeft className="w-8 object-contain stroke-foreground group-hover:stroke-primary group-disabled:group-hover:stroke-foreground" />
      </button>

      <div className="h-full flex-1 overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {imageUrls.map((item, index) => (
            <div
              key={index}
              className="relative h-full w-full shrink-0 aspect-video"
            >
              <Image src={item} alt={''} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={isTransitioning || isLastImage}
        onClick={goToNext}
        className={`group text-foreground cursor-pointer disabled:cursor-default ${
          isLastImage ? 'opacity-40' : 'opacity-100'
        }`}
      >
        <ChevronLeft className="w-8 h-auto rotate-180 stroke-foreground group-hover:stroke-primary group-disabled:group-hover:stroke-foreground" />
      </button>
    </div>
  )
}

export default ControllableCarousel
