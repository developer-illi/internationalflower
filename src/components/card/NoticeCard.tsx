import Link from 'next/link'
import { Notice } from '@/types/notice'
import { formatDate } from '@/utils/date'
import { Paperclip } from 'lucide-react'

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
      <h3 className="text-base sm:text-lg font-normal group-hover:text-background transition-colors flex items-center gap-x-2">
        <span>{notice.title}</span>
        {notice.attachmentCount > 0 && (
          <Paperclip
            className="w-4 h-4 shrink-0 opacity-60"
            aria-label={`첨부파일 ${notice.attachmentCount}건`}
          />
        )}
      </h3>
      <p className="text-sm sm:text-base font-light group-hover:text-background transition-colors">
        {formatDate(notice.date)}
      </p>
    </Link>
  )
}

export default NoticeCard
