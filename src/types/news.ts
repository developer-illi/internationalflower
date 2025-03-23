export const NEWS_TYPE = {
  all: 'ALL',
  issues: '최근이슈',
  report: '보도자료',
} as const

export type NewsType = keyof typeof NEWS_TYPE

export interface News {
  id: number
  title: string
  content: string
  image: string
  date: string
  type: NewsType
}

export interface NewsDetail {
  id: number
  title: string
  content: string
  date: string
  type: NewsType
}
