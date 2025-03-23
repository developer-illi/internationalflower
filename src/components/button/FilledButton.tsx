'use client'

import { HTMLAttributes } from 'react'

const FilledButton = ({
  className,
  children,
  onClick,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`cursor-pointer inline-flex items-center justify-center text-lg font-bold bg-foreground border border-foreground text-background transition-opacity ease-in-out duration-300 hover:opacity-70 rounded-full px-7 py-1 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default FilledButton
