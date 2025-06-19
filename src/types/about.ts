// Footer
// import { m } from 'framer-motion/dist/types.d-B50aGbjN'

export interface BaseInformation {
  name: string
  instagram: string
  blog: string
  address: string
}

// Contact
export interface ContactInformation {
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
export interface Greeting {
  title: string
  content: string
  writer: {
    association: string
    position: string
    name: string
  }
}

// 연혁
export interface HistorySection {
  id: number
  contents: Content[] // ← 배열 명 변경 필요
  type: 'information' | 'history' | string // 혹은 그냥 string
  title: string
}

export interface History extends HistorySection {
  content: {
    date: string
    event: Event []
  }
  title: string
}

export interface Information extends HistorySection {
  information: string
  keywords: Keyword[]
}
export interface Keyword {
  keyword: string
  description: string
}

export interface Content {
  id: number
  event: EventItem[]
  date: string
  history: number
}

export interface EventItem {
  id: number
  content: string
  img: string
  history_content: number
}

// export interface History extends HistorySection {
//   content: {
//     date: string
//     events: Event[]
//   }[]
// }
//
// export interface Event {
//   content: string
//   image?: string
// }

// 조직도
// export interface Profile {
//   id : number
//   image: string
//   name: string
//   position: string
//   description: string[]
// }
//
// export interface Organization {
//   president: Profile[]
//   vicePresidents: Profile[]
//   directors: Profile[]
// }

// 데이터셋 수정본
export interface Profile {
  image: string
  name: string
  position: string
  description: string[]
}

export interface Organization {
  president: Profile[]
  vicePresidents: Profile[]
  directors: Profile[]
}

// CI/BI
export interface CorporationIdentity {
  content: string
  logotypeConfiguration: string
  symbolMark: string
  colorSystem: string
  symbolMark2: string
}
