import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  href: string
}

const SectionHeader = ({ title, href }: SectionHeaderProps) => {
  return (
    <span className="flex justify-between items-center">
      <h2 className="text-2xl sm:text-3xl font-bold">{title.toUpperCase()}</h2>
      <Link href={href} className="cursor-pointer text-sm sm:text-base">
        전체보기
      </Link>
    </span>
  )
}

export default SectionHeader
