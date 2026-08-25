import { DEFAULT_REVALIDATE } from '@/constants/cache'

export interface BaseFetcherOptions {
  /** 쓰기 후 revalidateContent 로 무효화할 캐시 태그 */
  tags?: string[]
  /** 초 단위 TTL. false 면 태그 무효화 전까지 캐시를 유지한다. */
  revalidate?: number | false
}

export async function baseFetcher<T>(
  endPoint: string,
  options: BaseFetcherOptions = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''

  const url = endPoint.startsWith('http') ? endPoint : `${baseUrl}${endPoint}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: options.revalidate ?? DEFAULT_REVALIDATE,
        tags: options.tags,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error ${response.status}: ${errorText}`)
    }

    return (await response.json()) as T
  } catch (error) {
    throw error
  }
}
