'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { GalleryItem } from '@/types/business'
import Close from '@/assets/close.svg'

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  item: GalleryItem
}

const GalleryModal = ({ isOpen, onClose, item }: GalleryModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-4/5 h-fit max-h-3/5 pb-6 md:pb-0 bg-background shadow-lg flex flex-col items-end"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="mt-4 mr-4 cursor-pointer p-2 bg-[#E5E5E5] rounded-full aspect-square flex items-center justify-center"
        >
          <Close className="w-full h-full fill-foreground" />
        </button>

        {/* 팝업 내용 */}
        <div className="relative w-full h-fit flex flex-col md:flex-row gap-6 p-6 md:p-8 pt-2 md:pt-0 overflow-y-scroll scrollbar-none">
          <div className="relative shrink-0 min-w-1/2 aspect-square md:sticky md:top-0 overflow-hidden">
            <Image
              src={item.image}
              alt="image"
              fill
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex-1 h-fit md:h-auto md:overflow-y-scroll scrollbar-none">
            <hgroup className="flex flex-col gap-x-4 mb-4">
              <h2 className="text-2xl font-bold md:mt-6 ">{item.title}</h2>
              <h3 className="text-sm text-foreground/50">{item.date}</h3>
            </hgroup>
            <p className="text-sm text-foreground/50">{item.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default GalleryModal
