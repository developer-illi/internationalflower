export interface GalleryItem {
  id: number
  title: string
  date: string
  description: string
  image: string
}

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
