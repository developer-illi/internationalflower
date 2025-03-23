/**
 * 공지사항 API 응답 데이터 타입
 */

export interface NoticeResponse {
  id: number
  title: string
  date: string
}

export interface NoticeDetailResponse {
  id: number
  title: string
  date: string
  content: string
}
