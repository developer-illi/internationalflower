import Link from 'next/link'
import { Notice } from '@/types/notice'

interface NoticeCardProps {
  notice: Notice
}

const NoticeCard = ({ notice }: NoticeCardProps) => {
  return (
    <Link
      draggable={false}
      href={`/contents/notice/${notice.id}`}
      className="group bg-muted-background group-hover:bg-primary hover:bg-primary py-6 sm:py-6 px-10 sm:px-14 flex justify-between items-center transition-colors"
    >
      <h3 className="text-base sm:text-lg font-normal group-hover:text-background transition-colors">
        {notice.title}
      </h3>
      <p className="text-sm sm:text-base font-light group-hover:text-background transition-colors">
        {notice.date}
      </p>
    </Link>
  )
}

export default NoticeCard
