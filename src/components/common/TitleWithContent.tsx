import React from 'react'
import Title from '@/components/common/Title'

interface TitleWithContentProps {
  title: string
  subTitle?: string
  content: string
  className?: string
}

const TitleWithContent = ({
  title,
  subTitle,
  content,
  className,
}: TitleWithContentProps) => {
  return (
    <header
      className={`flex flex-col gap-y-[4vw] sm:gap-y-[3vw] lg:gap-y-10 pt-[2vw] ${className}`}
    >
      <Title title={title} subTitle={subTitle} />
      <p>{content}</p>
    </header>
  )
}

export default TitleWithContent
