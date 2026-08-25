import { NoticeAttachment } from '@/types/notice'
import { formatFileSize } from '@/constants/upload'

interface NoticeAttachmentListProps {
  attachments: NoticeAttachment[]
}

/**
 * 첨부 URL 은 R2 도메인이라 교차 출처이고, 그 경우 브라우저가 download 속성을
 * 무시해 UUID 파일명으로 저장된다. 같은 출처의 프록시 라우트를 거쳐
 * Content-Disposition 을 붙이면 원본 한글 파일명으로 받아진다.
 */
const toDownloadUrl = (attachment: NoticeAttachment) =>
  `/api/attachment?url=${encodeURIComponent(attachment.url)}&name=${encodeURIComponent(attachment.name)}`

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
              href={toDownloadUrl(attachment)}
              download={attachment.name}
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
