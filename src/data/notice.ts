import { NoticeDetailResponse, NoticeResponse } from '@/api/types/notice'
import { SAMPLE_HTML } from '@/data/_sample'

export const NOTICE_DATA: NoticeResponse[] = [
  { id: 1, title: '공지 제목 1', date: '2024.01.01' },
  { id: 2, title: '공지 제목 2', date: '2024.01.02' },
  { id: 3, title: '공지 제목 3', date: '2024.01.03' },
  { id: 4, title: '공지 제목 4', date: '2024.01.04' },
  { id: 5, title: '공지 제목 5', date: '2024.01.05' },
]

export const NOTICE_DETAIL_DATA: NoticeDetailResponse = {
  id: 1,
  title: '공지 제목입니다.',
  content: SAMPLE_HTML,
  date: '2024.12.20',
}
