import { HTMLAttributes } from 'react'

interface TagProps extends HTMLAttributes<HTMLParagraphElement> {
  hover?: boolean
}

const Tag = ({ hover = false, children, className, ...props }: TagProps) => {
  return (
    <p
      className={`cursor-default box-border w-fit border border-foreground rounded-full px-2.5 py-0.5 text-sm font-normal ${
        hover &&
        'group-hover:border-background group-hover:bg-background group-hover:text-primary'
      } ${className}`}
      {...props}
    >
      {children}
    </p>
  )
}

export default Tag
