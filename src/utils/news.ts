import { NEWS_TYPE, NewsType } from '@/types/news'

export const isNewsType = (value?: string): value is NewsType => {
  return Object.keys(NEWS_TYPE).includes(value as NewsType)
}

export const convertTypeToLabel = (type: NewsType) => {
  return NEWS_TYPE[type]
}

export const convertLabelToType = (label: string): NewsType => {
  return Object.keys(NEWS_TYPE).find(
    (key) => NEWS_TYPE[key as NewsType] === label,
  ) as NewsType
}
