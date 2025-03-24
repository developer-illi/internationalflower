'use client'

import { PropsWithChildren, useCallback } from 'react'
import Close from '@/assets/close.svg'
import { motion } from 'framer-motion'
interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
}

const BaseModal = ({
  children,
  isOpen,
  onClose,
  onConfirm,
}: PropsWithChildren<BaseModalProps>) => {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose],
  )

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm cursor-default"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg mx-4 bg-background border border-foreground/10 rounded-2xl [box-shadow:20px_20px_20px_0px_#00000014]"
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 cursor-pointer p-1.5 m-2.5 bg-[#E5E5E5] rounded-full aspect-square flex items-center justify-center"
        >
          <Close className="w-full h-full fill-foreground" />
        </button>

        <div className="p-6 space-y-10 break-keep">
          {children}
          <div className="flex justify-between gap-4 text-base">
            {onConfirm && (
              <button
                onClick={onClose}
                className="cursor-pointer w-full rounded-full bg-background border border-foreground py-2"
              >
                Cancel
              </button>
            )}
            <button
              onClick={onConfirm || onClose}
              className="cursor-pointer w-full rounded-full bg-foreground text-background py-2"
            >
              OK
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default BaseModal
