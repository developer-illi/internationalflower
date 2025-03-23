import Link, { LinkProps } from 'next/link'

interface LinkButtonProps
  extends LinkProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

const LinkButton = ({ className, children, ...props }: LinkButtonProps) => {
  return (
    <Link
      className={`w-fit place-self-center cursor-pointer rounded-full bg-foreground font-semibold text-base text-background px-10 py-3 hover:bg-primary transition-colors select-none ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}

export default LinkButton
