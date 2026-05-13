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
} from '@/types/business'
import { baseFetcher } from '@/api/base'
import { mapResponse } from '@/utils/mapper'

export async function getExhibition(type: string): Promise<Exhibition[]> {
  const response = await baseFetcher<ExhibitionResponse[]>(
    `/exhibition?type=${type}`,
  )
  return response.map((exhibition) =>
    mapResponse<Exhibition, ExhibitionResponse>(exhibition),
  )
}

export async function getCertification(): Promise<Certification[]> {
  const response = await baseFetcher<CertificationResponse[]>(
     '/license',
  )
  return response.map((certification) =>
    mapResponse<Certification, CertificationResponse>(certification),
  )
}

export async function getActivity(): Promise<Activity[]> {
  const response = await baseFetcher<ActivityResponse[]>('/activity')
  return response.map((activity) =>
    mapResponse<Activity, ActivityResponse>(activity),
  )
}

export async function getActivityDetail(id: number): Promise<ActivityDetail> {
  const response = await baseFetcher<ActivityDetailResponse>(
    `/activity/${id}`,
    // `http://localhost:3000/api/activity/${id}`,
  )
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
  if (!response.ok) throw new Error(`API error ${response.status}`)
}

export async function deleteActivity(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/activity_delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error(`API error ${response.status}`)
}

export async function updateActivityContent(
  id: number,
  formData: FormData,
): Promise<void> {
  const response = await fetch(`${apiUrl}/acticontent_update/${id}`, {
    method: 'PATCH',
    body: formData,
  })
  if (!response.ok) throw new Error(`API error ${response.status}`)
}

export async function deleteActivityContent(id: number): Promise<void> {
  const response = await fetch(`${apiUrl}/acticontent_delete/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error(`API error ${response.status}`)
}
