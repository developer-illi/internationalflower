import { NewsResponse, NewsDetailResponse } from '@/api/types/news'
import { News, NewsDetail } from '@/types/news'
import { mapResponse } from '@/utils/mapper'
import { sortByDateDesc } from '@/utils/date'
import { throwIfNotOk } from '@/utils/error'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

async function newsFetcher<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`API error ${response.status}`)
  return response.json()
}

export async function getNewsList(type: string): Promise<News[]> {
  const response = await newsFetcher<NewsResponse[]>(`/news?type=${type}`)
  return sortByDateDesc(
    response.map((news) => mapResponse<News, NewsResponse>(news)),
  )
}

export async function getNewsDetailData(id: number): Promise<NewsDetail> {
  const response = await newsFetcher<NewsDetailResponse>(`/news/${id}`)
  return mapResponse<NewsDetail, NewsDetailResponse>(response)
}

export async function updateNews(id: number, formData: FormData): Promise<void> {
  const response = await fetch(`${apiUrl}/news_update/${id}`, {
    method: 'PATCH',
    body: formData,
  })
  await throwIfNotOk(response, '소식 수정에 실패했습니다.')
}
