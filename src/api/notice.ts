import {
  NoticeResponse,
  NoticeDetailResponse,
  NoticeMutationResponse,
} from '@/api/types/notice'
import { Notice, NoticeDetail } from '@/types/notice'
import { baseFetcher } from '@/api/base'
import { mapResponse } from '@/utils/mapper'
import { sortByDateDesc } from '@/utils/date'
import { throwIfNotOk } from '@/utils/error'
import { CONTENT_TAGS } from '@/constants/cache'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

export async function getNoticeList(searchKeyword?: string): Promise<Notice[]> {
  const response = await baseFetcher<NoticeResponse[]>(
    `/notice${searchKeyword ? `?search=${encodeURIComponent(searchKeyword)}` : ''}`,
    { tags: [CONTENT_TAGS.notice] },
  )
  return sortByDateDesc(
    response.map((notice) => ({
      ...mapResponse<Notice, NoticeResponse>(notice),
      // 첨부 필드는 백엔드 배포 전 응답에 없다. 화면이 깨지지 않게 기본값을 채운다.
      attachmentCount: notice.attachmentCount ?? 0,
    })),
  )
}

export async function getNoticeDetailData(id: number): Promise<NoticeDetail> {
  const response = await baseFetcher<NoticeDetailResponse>(`/notice/${id}`, {
    tags: [CONTENT_TAGS.notice],
  })
  return {
    ...mapResponse<NoticeDetail, NoticeDetailResponse>(response),
    attachments: response.attachments ?? [],
  }
}

/** 등록. 응답의 id 로 작성된 글 상세로 바로 이동시킨다. */
export async function createNotice(
  formData: FormData,
): Promise<NoticeMutationResponse | null> {
  const response = await fetch(`${apiUrl}/notice_add`, {
    method: 'POST',
    body: formData,
  })
  await throwIfNotOk(response, '공지사항 등록에 실패했습니다.')

  try {
    return (await response.json()) as NoticeMutationResponse
  } catch {
    // 구버전 백엔드는 본문 없이 응답한다.
    return null
  }
}

/**
 * 부분 수정. 보내지 않은 필드는 서버가 그대로 유지하므로
 * 값이 없다고 빈 문자열을 넣어 보내면 안 된다.
 */
export async function updateNotice(
  id: number,
  formData: FormData,
): Promise<void> {
  const response = await fetch(`${apiUrl}/notice_update/${id}`, {
    method: 'PATCH',
    body: formData,
  })
  await throwIfNotOk(response, '공지사항 수정에 실패했습니다.')
}

export async function deleteNotice(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/notice_delete/${id}`, {
    method: 'DELETE',
  })
  await throwIfNotOk(response, '공지사항 삭제에 실패했습니다.')
}

export async function deleteNoticeAttachment(attachmentId: number): Promise<void> {
  const response = await fetch(`${apiUrl}/notice_attachment_delete/${attachmentId}`, {
    method: 'DELETE',
  })
  await throwIfNotOk(response, '첨부파일 삭제에 실패했습니다.')
}
