'use client'

import ArrowLeft from '@/assets/arrow-left.svg'

const BackButton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`cursor-pointer flex items-center gap-1 text-base font-semibold text-foreground hover:text-primary ${className}`}
      onClick={() => window.history.back()}
      {...props}
    >
      <ArrowLeft className="w-6 h-auto fill-foreground" />
      이전으로
    </button>
  )
}

export default BackButton
