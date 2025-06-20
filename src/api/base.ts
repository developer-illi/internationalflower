export async function baseFetcher<T>(endPoint: string): Promise<T> {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_URL || ''
      : process.env.NEXT_PUBLIC_API_URL || ''

  const url = endPoint.startsWith('http') ? endPoint : `${baseUrl}${endPoint}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
      cache: 'no-cache',
    })

    if (!response.ok) {
      const errorText = await response.text()
      // console.error('❌ API 응답 에러:', response.status, errorText)
      throw new Error(`API error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    // console.error('❌ Fetch 중 에러 발생:', error)
    throw error  // 원래 에러를 그대로 다시 던짐
  }
}