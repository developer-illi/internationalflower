export async function baseFetcher<T>(endPoint: string): Promise<T> {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_API_URL || ''

  try {
    const response = await fetch(`${baseUrl}${endPoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60 * 60 * 24, // 1 day
      },
    })

    if (!response.ok) {
      throw new Error('요청을 보내는 중 오류가 발생했습니다.')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('알 수 없는 에러가 발생했습니다')
  }
}
