export interface GalleryItem {
  id: number
  title: string
  date: string
  description: string
  image: string
}

/** 백엔드가 허용하는 전시 구분. 그 외 값은 400 을 반환한다. */
export type ExhibitionType = 'domestic' | 'international'

export interface Exhibition {
  id: number
  title: string
  subTitle: string
  content: string
  headerImage: string
  mainImageList: string[]
  galleryList: GalleryItem[]
}

export interface Activity {
  id: number
  title: string
  content: string
  headerImage: string
  galleryList: GalleryItem[]
}

export interface ActivityDetail {
  id: number
  mainImage: string
  title: string
  date: string
  location: string
  florists: string[]
  content: string
}

export interface Certification {
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
