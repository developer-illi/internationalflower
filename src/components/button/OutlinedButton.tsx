'use client'

import { HTMLAttributes } from 'react'

const OutlinedButton = ({
  className,
  children,
  onClick,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`cursor-pointer inline-flex items-center justify-center text-lg font-bold border border-foreground text-foreground transition-opacity ease-in-out duration-300 hover:opacity-70 rounded-full px-7 py-1 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default OutlinedButton
