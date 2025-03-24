import { HTMLAttributes } from 'react'
import Image from 'next/image'

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  src: string
  alt: string
  width?: number
  height?: number
}

const IconButton = ({
  className,
  src,
  alt,
  width = 32,
  height = 32,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={`cursor-pointer inline-flex items-center justify-center transition-opacity ease-in-out duration-300 hover:opacity-70 ${className}`}
      {...props}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </button>
  )
}

export default IconButton
