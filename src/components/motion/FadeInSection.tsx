import { PropsWithChildren } from 'react'

const FadeInSection = ({
  children,
  className = '',
  delay = 0,
}: PropsWithChildren<{ delay?: number; className?: string }>) => {
  const animations = [
    'animate-fade-up',
    'animate-fade-up-delay-1',
    'animate-fade-up-delay-2',
    'animate-fade-up-delay-3',
    'animate-fade-up-delay-4',
    'animate-fade-up-delay-5',
  ]

  return (
    <div
      className={`w-full opacity-0 ${
        animations.at(delay) ?? animations.at(0)
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default FadeInSection
