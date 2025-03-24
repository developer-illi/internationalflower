import { NewsResponse, NewsDetailResponse } from '@/api/types/news'
import { SAMPLE_HTML } from '@/data/_sample'

export const NEWS_DATA: NewsResponse[] = [
  {
    id: 1,
    title: '뉴스 제목 1',
    content: '뉴스 내용 1',
    date: '2024.01.01',
    type: 'issues',
    image: '/images/dummy/1.png',
  },
  {
    id: 2,
    title: '뉴스 제목 2',
    content: '뉴스 내용 2',
    date: '2024.01.02',
    type: 'issues',
    image: '/images/dummy/2.png',
  },
  {
    id: 3,
    title: '뉴스 제목 3',
    content: '뉴스 내용 3',
    date: '2024.01.03',
    type: 'report',
    image: '/images/dummy/3.png',
  },
  {
    id: 4,
    title: '뉴스 제목 4',
    content: '뉴스 내용 4',
    date: '2024.01.04',
    type: 'report',
    image: '/images/dummy/4.png',
  },
]

export const NEWS_DETAIL_DATA: NewsDetailResponse = {
  id: 1,
  title: '뉴스 제목 1',
  content: SAMPLE_HTML,
  date: '2024.01.01',
  type: 'issues',
}
