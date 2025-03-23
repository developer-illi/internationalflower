import Image from 'next/image'
import Link from 'next/link'
import Tag from '@/components/common/Tag'
import { News } from '@/types/news'
import { convertTypeToLabel } from '@/utils/news'

interface NewsCardProps {
  news: News
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link
      href={`/news/${news.id}`}
      className="w-full h-fit group inline-block bg-muted-background hover:bg-primary text-foreground hover:text-background"
    >
      <div className="p-6 space-y-6">
        <Tag hover>{convertTypeToLabel(news.type)}</Tag>
        <div className="space-y-3">
          <h3 className="text-xl font-bold relative w-fit underline-animation underline-thick">
            {news.title}
          </h3>
          <p className="line-clamp-1 relative w-fit underline-animation underline-thick">
            {news.content}
          </p>
          <p>{news.date}</p>
        </div>
      </div>
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </Link>
  )
}

export default NewsCard
