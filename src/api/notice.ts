import { NoticeResponse, NoticeDetailResponse } from '@/api/types/notice'
import { Notice, NoticeDetail } from '@/types/notice'
import { baseFetcher } from '@/api/base'
import { mapResponse } from '@/utils/mapper'

export async function getNoticeList(searchKeyword?: string): Promise<Notice[]> {
  const response = await baseFetcher<NoticeResponse[]>(
    `/notice${searchKeyword ? `?search=${searchKeyword}` : ''}`,
  )
  return response.map((notice) => mapResponse<Notice, NoticeResponse>(notice))
}

export async function getNoticeDetailData(id: number): Promise<NoticeDetail> {
  const response = await baseFetcher<NoticeDetailResponse>(`/notice/${id}`)
  return mapResponse<NoticeDetail, NoticeDetailResponse>(response)
}
