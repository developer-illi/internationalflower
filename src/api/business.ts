import {
  ExhibitionResponse,
  CertificationResponse,
  ActivityResponse,
  ActivityDetailResponse,
} from '@/api/types/business'
import {
  Exhibition,
  Certification,
  Activity,
  ActivityDetail,
  ExhibitionType,
  GalleryItem,
} from '@/types/business'
import { baseFetcher } from '@/api/base'
import { mapResponse } from '@/utils/mapper'
import { sortByDateDesc } from '@/utils/date'
import { CONTENT_TAGS } from '@/constants/cache'
import { throwIfNotOk } from '@/utils/error'

const sortGallery = (galleryList?: GalleryItem[]): GalleryItem[] =>
  galleryList ? sortByDateDesc(galleryList) : []

export async function getExhibition(
  type: ExhibitionType,
): Promise<Exhibition[]> {
  const response = await baseFetcher<ExhibitionResponse[]>(
    `/exhibition?type=${type}`,
    { tags: [CONTENT_TAGS.exhibition] },
  )
  return response.map((exhibition) => {
    const mapped = mapResponse<Exhibition, ExhibitionResponse>(exhibition)
    return {
      ...mapped,
      // 백엔드는 이 필드만 snake_case(sub_title)로 내려준다. 양쪽 모두 받아
      // 서브타이틀이 비어 보이지 않게 한다. (백엔드 P2-1 반영 후에도 그대로 동작)
      subTitle:
        mapped.subTitle ??
        (exhibition as ExhibitionResponse & { sub_title?: string }).sub_title ??
        '',
      galleryList: sortGallery(mapped.galleryList),
    }
  })
}

export async function getCertification(): Promise<Certification[]> {
  const response = await baseFetcher<CertificationResponse[]>('/license', {
    tags: [CONTENT_TAGS.license],
  })
  return response.map((certification) =>
    mapResponse<Certification, CertificationResponse>(certification),
  )
}

export async function getActivity(): Promise<Activity[]> {
  const response = await baseFetcher<ActivityResponse[]>('/activity', {
    tags: [CONTENT_TAGS.activity],
  })
  return response.map((activity) => {
    const mapped = mapResponse<Activity, ActivityResponse>(activity)
    const detail = (mapped as Activity & { activity_detail?: GalleryItem[] })
      .activity_detail

    return {
      ...mapped,
      galleryList: sortGallery(mapped.galleryList),
      ...(detail ? { activity_detail: sortByDateDesc(detail) } : {}),
    }
  })
}

export async function getActivityDetail(id: number): Promise<ActivityDetail> {
  const response = await baseFetcher<ActivityDetailResponse>(`/activity/${id}`, {
    tags: [CONTENT_TAGS.activity],
  })
  return mapResponse<ActivityDetail, ActivityDetailResponse>(response)
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

export async function updateActivity(
  id: number,
  formData: FormData,
): Promise<void> {
  const response = await fetch(`${apiUrl}/activity_update/${id}`, {
    method: 'PATCH',
    body: formData,
  })
  await throwIfNotOk(response, '대외활동 수정에 실패했습니다.')
}

export async function deleteActivity(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/activity_delete/${id}`, {
    method: 'DELETE',
  })
  await throwIfNotOk(response, '대외활동 삭제에 실패했습니다.')
}

export async function updateActivityContent(
  id: number,
  formData: FormData,
): Promise<void> {
  const response = await fetch(`${apiUrl}/acticontent_update/${id}`, {
    method: 'PATCH',
    body: formData,
  })
  await throwIfNotOk(response, '활동 내역 수정에 실패했습니다.')
}

export async function deleteActivityContent(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/acticontent_delete/${id}`, {
    method: 'DELETE',
  })
  await throwIfNotOk(response, '활동 내역 삭제에 실패했습니다.')
}

// 국내전시
export async function updateDomestic(id: number, formData: FormData): Promise<void> {
  const response = await fetch(`${apiUrl}/domestic_update/${id}`, {
    method: 'PATCH',
    body: formData,
  })
  await throwIfNotOk(response, '국내전시 수정에 실패했습니다.')
}

export async function deleteDomestic(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/domestic_delete/${id}`, { method: 'DELETE' })
  await throwIfNotOk(response, '국내전시 삭제에 실패했습니다.')
}

export async function deleteDomesticContent(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/domestic_content_delete/${id}`, { method: 'DELETE' })
  await throwIfNotOk(response, '국내전시 사진 삭제에 실패했습니다.')
}

// 국외전시
export async function updateOverseas(id: number, formData: FormData): Promise<void> {
  const response = await fetch(`${apiUrl}/overseas_update/${id}`, {
    method: 'PATCH',
    body: formData,
  })
  await throwIfNotOk(response, '해외전시 수정에 실패했습니다.')
}

export async function deleteOverseas(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/overseas_delete/${id}`, { method: 'DELETE' })
  await throwIfNotOk(response, '해외전시 삭제에 실패했습니다.')
}

export async function deleteOverseasContent(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/overseas_content_delete/${id}`, { method: 'DELETE' })
  await throwIfNotOk(response, '해외전시 사진 삭제에 실패했습니다.')
}

// 자격증
export async function updateCertification(id: number, formData: FormData): Promise<void> {
  const response = await fetch(`${apiUrl}/license_update/${id}`, {
    method: 'PATCH',
    body: formData,
  })
  await throwIfNotOk(response, '자격증 수정에 실패했습니다.')
}

export async function deleteCertification(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/license_delete/${id}`, { method: 'DELETE' })
  await throwIfNotOk(response, '자격증 삭제에 실패했습니다.')
}
