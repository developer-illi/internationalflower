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

export async function getBaseInformation(): Promise<BaseInformation> {
  const response = await baseFetcher<BaseInformationResponse>(
    '/api/base-information',
  )
  return mapResponse<BaseInformation, BaseInformationResponse>(response)
}

export async function getContactInformation(): Promise<ContactInformation> {
  const response = await baseFetcher<ContactInformationResponse>(
    '/api/contact-information',
  )
  return mapResponse<ContactInformation, ContactInformationResponse>(response)
}

export async function getGreeting(): Promise<Greeting> {
  const response = await baseFetcher<GreetingResponse>('/api/greeting')
  return mapGreetingResponseToGreeting(response)
}

export async function getHistory(): Promise<HistorySection[]> {
  const response = await baseFetcher<HistoryResponse[]>('/api/history')
  return response.map((history) =>
    mapResponse<HistorySection, HistoryResponse>(history),
  )
}

export async function getOrganization(): Promise<Organization> {
  const response = await baseFetcher<OrganizationResponse>('/api/organization')
  return mapResponse<Organization, OrganizationResponse>(response)
}

export async function getCorporationIdentity(): Promise<CorporationIdentity> {
  const response = await baseFetcher<CorporationIdentityResponse>(
    '/api/corporation-identity',
  )
  return mapResponse<CorporationIdentity, CorporationIdentityResponse>(response)
}
