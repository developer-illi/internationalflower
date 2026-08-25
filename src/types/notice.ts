export interface NoticeAttachment {
  id: number
  /** 원본 파일명 (한글 보존) */
  name: string
  url: string
  /** bytes */
  size: number
}

export interface Notice {
  id: number
  title: string
  date: string
  attachmentCount: number
}

export interface NoticeDetail {
  id: number
  title: string
  date: string
  content: string
  attachments: NoticeAttachment[]
}
