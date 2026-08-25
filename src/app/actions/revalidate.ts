'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { CONTENT_TAGS, type ContentTag } from '@/constants/cache'

/**
 * 글 등록·수정·삭제는 브라우저에서 백엔드로 직접 POST 하기 때문에
 * Next 서버는 데이터가 바뀐 사실을 알 수 없다. 그래서 쓰기 성공 직후
 * 클라이언트가 이 액션을 호출해 캐시를 명시적으로 무효화한다.
 *
 * router.refresh() 만으로는 fetch 데이터 캐시가 갱신되지 않아
 * "등록은 됐는데 화면에 안 보인다"는 증상이 생겼다.
 */
const PATHS_BY_TAG: Record<ContentTag, string[]> = {
  [CONTENT_TAGS.notice]: ['/contents/notice'],
  [CONTENT_TAGS.news]: ['/news'],
  [CONTENT_TAGS.exhibition]: ['/business/domestic', '/business/international'],
  [CONTENT_TAGS.activity]: ['/business/activities'],
  [CONTENT_TAGS.license]: ['/business/certification'],
  [CONTENT_TAGS.history]: ['/about/history'],
  [CONTENT_TAGS.organization]: ['/about/organization'],
}

export async function revalidateContent(tag: ContentTag) {
  revalidateTag(tag)

  // 목록/상세가 함께 무효화되도록 섹션 루트를 layout 단위로 처리한다.
  for (const path of PATHS_BY_TAG[tag] ?? []) {
    revalidatePath(path, 'layout')
  }

  // 메인은 공지·소식 섹션을 직접 렌더링하므로 항상 함께 갱신한다.
  revalidatePath('/')
}
