/**
 * 협회 기본 정보 API 응답 데이터 타입
 */
import { list } from 'postcss'

// Footer에 표시되는 정보
export interface BaseInformationResponse {
  name: string
  instagram: string
  blog: string
  address: string
}

// Contact 페이지에 표시되는 정보
export interface ContactInformationResponse {
  name: string
  phone: string
  email: string
  address: string
  location: {
    latitude: number
    longitude: number
  }
}

// 인사말
export interface GreetingResponse {
  title: string
  content: string
  writer: Writer
}

export interface Writer{
  association : string
  position : string
  name : string
}
// export interface GreetingResponse {
//   id: number;
//   title: string;
//   content: string;
//   writer: WriterResponse[];
// }
//
// export interface WriterResponse {
//   id: number;
//   association: string;
//   position: string;
//   name: string;
//   greeting: number;
// }
//
// // 애플리케이션 내부에서 사용하는 데이터 모델
// export interface Greeting {
//   title: string;
//   content: string;
//   writer: Writer[];
// }
//
// export interface Writer {
//   association: string;
//   position: string;
//   name: string;
//   // 필요하다면 추가 필드를 정의할 수 있습니다.
// }

// 연혁
export interface HistoryResponse {
  id: number
  title: string
  type: 'information' | 'history'
}

export interface Information extends HistoryResponse {
  information: string
  keywords: Keyword[]
}

export interface Keyword {
  keyword: string
  description: string
}

export interface History extends HistoryResponse {
  content: {
    date: string
    events: Event[]
  }[]
}

export interface Event {
  content: string
  image?: string
}

// 조직도
export interface Profile {
  image: string
  name: string
  position: string
  description: string[]
}

export interface OrganizationResponse {
  president: Profile[]
  vicePresidents: Profile[]
  directors: Profile[]
}

// CI/BI
export interface CorporationIdentityResponse {
  content: string
  logotypeConfiguration: string
  symbolMark: string
  colorSystem: string
  symbolMark2: string
}
