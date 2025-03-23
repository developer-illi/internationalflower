/**
 * 협회 소식 API 응답 데이터 타입
 */

export interface NewsResponse {
  id: number
  title: string
  content: string
  image: string
  date: string
  type: string
}

export interface NewsDetailResponse {
  id: number
  title: string
  content: string
  date: string
  type: string
}
