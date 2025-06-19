/**
 * 주요 사업 API 응답 데이터 타입
 */

// 국내/국외 전시 행사
export interface GalleryItem {
  id: number
  title: string
  date: string
  description: string
  image: string
}

export interface ExhibitionResponse {
  id: number
  title: string
  subTitle: string
  content: string
  headerImage: string
  mainImageList: string[]
  galleryList: GalleryItem[]
}

// 자격증
export interface CertificationResponse {
  id: number
  title: string
  content: string
  headerImage: string
  certification: {
    image: string
    information: string
    hyperlink: string
  }
}

// 대외활동
export interface ActivityResponse {
  id: number
  title: string
  content: string
  headerImage: string
  galleryList: GalleryItem[]
}

export interface ActivityDetailResponse {
  id: number
  mainImage: string
  title: string
  date: string
  location: string
  florists: string[]
  content: string
}