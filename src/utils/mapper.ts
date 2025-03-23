import { Greeting } from '@/types/about'
import { GreetingResponse } from '@/api/types/about'

export const mapResponse = <T, U>(
  response: U,
  propertyMappings?: Record<string, keyof T>,
): T => {
  const mappedResult: Partial<T> = {}

  const mapValue = (value: any): any => {
    if (Array.isArray(value)) {
      return value.map(mapValue)
    } else if (value && typeof value === 'object') {
      return mapResponse(value, propertyMappings)
    }
    return value
  }

  for (const key in response) {
    const mappedKey = propertyMappings?.[key] ?? (key as unknown as keyof T)
    mappedResult[mappedKey] = mapValue(response[key]) as T[keyof T]
  }

  return mappedResult as T
}

// Greeting
const greetingMappings: Record<string, keyof Greeting> = {
  title: 'title',
  content: 'content',
}

const writerMappings: Record<string, keyof Greeting['writer']> = {
  association: 'association',
  position: 'position',
  name: 'name',
}

export const mapGreetingResponseToGreeting = (
  response: GreetingResponse,
): Greeting => ({
  ...mapResponse<Greeting, GreetingResponse>(response, greetingMappings),
  writer: mapResponse<Greeting['writer'], GreetingResponse['writer']>(
    response.writer,
    writerMappings,
  ),
})
