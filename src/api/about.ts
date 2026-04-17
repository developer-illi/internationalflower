import {
  BaseInformationResponse,
  ContactInformationResponse,
  GreetingResponse,
  HistoryResponse,
  OrganizationResponse,
  CorporationIdentityResponse,
} from '@/api/types/about'
import {
  BaseInformation,
  ContactInformation,
  Greeting,
  HistorySection,
  Organization,
  CorporationIdentity,
} from '@/types/about'
import { baseFetcher } from '@/api/base'
import { mapResponse, mapGreetingResponseToGreeting } from '@/utils/mapper'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://i-fa.or.kr'

export async function getBaseInformation(): Promise<BaseInformation> {
  const response = await baseFetcher<BaseInformationResponse>(
    `${siteUrl}/api/base-information`,
  )
  return mapResponse<BaseInformation, BaseInformationResponse>(response)
}

export async function getContactInformation(): Promise<ContactInformation> {
  const response = await baseFetcher<ContactInformationResponse>(
    `${siteUrl}/api/contact-information`,
  )
  return mapResponse<ContactInformation, ContactInformationResponse>(response)
}

export async function getGreeting(): Promise<Greeting> {
  const response = await baseFetcher<GreetingResponse>(`${siteUrl}/api/greeting`)
  return mapGreetingResponseToGreeting(response)
}
//수정 해야하는 부분
export async function getHistory(): Promise<HistorySection[]> {
  try {
    const response = await baseFetcher<HistoryResponse[]>('/history')
    // console.log('✅ 응답:', response)
    return response.map((history) =>
      mapResponse<HistorySection, HistoryResponse>(history),
    )
  } catch (err) {
    // console.error('❌ getHistory 에러:', err.response?.status, err.response?.data)
    return []
  }
}

export async function getOrganization(): Promise<Organization> {
  const response = await baseFetcher<OrganizationResponse>('/organization')
  return mapResponse<Organization, OrganizationResponse>(response)
}

export async function getCorporationIdentity(): Promise<CorporationIdentity> {
  const response = await baseFetcher<CorporationIdentityResponse>(`${siteUrl}/api/corporation-identity`)
  return mapResponse<CorporationIdentity, CorporationIdentityResponse>(response)
}
