import { NewsResponse, NewsDetailResponse } from '@/api/types/news'
import { News, NewsDetail } from '@/types/news'
import { baseFetcher } from '@/api/base'
import { mapResponse } from '@/utils/mapper'

export async function getNewsList(type: string): Promise<News[]> {
  const response = await baseFetcher<NewsResponse[]>(`/news?type=${type}`)
  return response.map((news) => mapResponse<News, NewsResponse>(news))
}

export async function getNewsDetailData(id: number): Promise<NewsDetail> {
  const response = await baseFetcher<NewsDetailResponse>(`/news/${id}`)
  return mapResponse<NewsDetail, NewsDetailResponse>(response)
}
