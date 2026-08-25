/**
 * 서버 렌더링 시 fetch 에 붙이는 캐시 태그.
 * 쓰기 직후 revalidateContent(태그) 로 해당 데이터만 골라 무효화한다.
 *
 * ('use server' 파일은 async 함수만 export 할 수 있어 상수는 여기에 둔다)
 */
export const CONTENT_TAGS = {
  notice: 'notice',
  news: 'news',
  exhibition: 'exhibition',
  activity: 'activity',
  license: 'license',
  history: 'history',
  organization: 'organization',
} as const

export type ContentTag = (typeof CONTENT_TAGS)[keyof typeof CONTENT_TAGS]

/**
 * 태그 무효화가 주 갱신 수단이고, 이 TTL 은 안전망이다.
 * Django 어드민에서 직접 수정하는 등 사이트를 거치지 않은 변경도
 * 최대 5분 안에는 반영되도록 한다. (기존 값은 1시간이었다)
 */
export const DEFAULT_REVALIDATE = 300
