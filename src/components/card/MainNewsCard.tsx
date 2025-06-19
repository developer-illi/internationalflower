import Link from 'next/link'
import Image from 'next/image'
import Tag from '../common/Tag'
import { News } from '@/types/news'
import { convertTypeToLabel } from '@/utils/news'

interface MainNewsCardProps {
  news: News
}

const MainNewsCard = ({ news }: MainNewsCardProps) => {
  return (
    <Link
      draggable={false}
      href={`/news/${news.id}`}
      className="group border-t pt-7 border-foreground flex flex-col gap-y-4"
    >
      <Tag>{convertTypeToLabel(news.type)}</Tag>
      <hgroup>
        <h3 className="text-base sm:text-lg font-bold relative w-fit underline-animation underline-thick">
          {news.title}
        </h3>
        <p className="text-base sm:text-lg font-normal mt-2 line-clamp-2 relative w-fit underline-animation underline-thick">
          {news.content}
        </p>
      </hgroup>
      <p className="text-foreground font-light">{news.date}</p>
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={news.image}
          alt={`${news.title}`}
          fill
          sizes="(max-width: 1024) 99vw, (max-width: 1120px) 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          priority
        />
      </div>
    </Link>
  )
}

export default MainNewsCard
