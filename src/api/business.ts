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
