export async function baseFetcher<T>(endPoint: string): Promise<T> {

  //여기부분 짜는거 공부좀 해봐야 할듯 필ㅊ
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_URL || ''
      : process.env.NEXT_PUBLIC_API_URL || ''

  if (endPoint.startsWith('http://') || endPoint.startsWith('https://')) {
    try {
      const response = await fetch(`${endPoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60 * 60 * 24, // 1 day
        },
        cache: 'no-cache',
      })

      if (!response.ok) {
        throw new Error('요청을 보내는 중 오류가 발생했습니다.')
      }

      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('알 수 없는 에러가 발생했습니다')
    }
  } else {
    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 60 * 60 * 24, // 1 day
        },
        cache: 'no-cache',
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

}
