import { NoticeAttachment } from '@/types/notice'
import { formatFileSize } from '@/constants/upload'

interface NoticeAttachmentListProps {
  attachments: NoticeAttachment[]
}

/**
 * 공지 첨부파일 목록.
 *
 * url 은 R2(pub-....r2.dev) 도메인이라 교차 출처다. 브라우저가 download 속성을
 * 무시하고 새 탭에서 여는 경우가 있는데(pdf·이미지), 그 편이 오히려 자연스럽고
 * hwp·zip 은 그대로 내려받아진다.
 */
const NoticeAttachmentList = ({ attachments }: NoticeAttachmentListProps) => {
  if (attachments.length === 0) return null

  return (
    <section className="w-full border border-border-tab rounded-md p-5">
      <h4 className="text-base font-semibold mb-3">
        첨부파일 <span className="text-primary">{attachments.length}</span>
      </h4>
      <ul className="space-y-2">
        {attachments.map((attachment) => (
          <li key={attachment.id}>
            <a
              href={attachment.url}
              download={attachment.name}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-2 text-sm hover:text-primary transition-colors"
            >
              <span className="break-all underline-offset-4 group-hover:underline">
                {attachment.name}
              </span>
              <span className="shrink-0 text-muted-text text-xs">
                {formatFileSize(attachment.size)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default NoticeAttachmentList
