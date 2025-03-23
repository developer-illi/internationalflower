import { HTMLAttributes } from 'react'

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  title: string
  subTitle?: string
  className?: string
}

const Title = ({ title, subTitle, className, ...props }: TitleProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row gap-x-4 lg:gap-x-8 gap-y-2 sm:gap-y-3 md:gap-y-6 ${className}`}
      {...props}
    >
      <h1 className="text-title">{title}</h1>
      {subTitle && (
        <p className="md:self-end text-sm sm:text-base font-semibold pb-2 lg:pb-4">
          {subTitle}
        </p>
      )}
    </div>
  )
}

export default Title
