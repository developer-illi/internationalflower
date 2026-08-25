/**
 * 공지사항 API 응답 데이터 타입
 */

export interface NoticeAttachmentResponse {
  id: number
  /** 업로더가 올린 원본 파일명 (한글 보존) */
  name: string
  /** R2 직접 다운로드 URL */
  url: string
  /** bytes */
  size: number
}

export interface NoticeResponse {
  id: number
  title: string
  date: string
  /** 백엔드 배포 전 응답에는 없을 수 있다 */
  attachmentCount?: number
}

export interface NoticeDetailResponse {
  id: number
  title: string
  date: string
  content: string
  /** 백엔드 배포 전 응답에는 없을 수 있다 */
  attachments?: NoticeAttachmentResponse[]
}

/** POST /notice_add, PATCH /notice_update/{id} 응답 */
export interface NoticeMutationResponse {
  id: number
  message?: string
  attachmentCount?: number
  attachments?: NoticeAttachmentResponse[]
}
