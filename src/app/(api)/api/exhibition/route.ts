import { NextResponse } from 'next/server'
import {
  DOMESTIC_EXHIBITION_DATA,
  INTERNATIONAL_EXHIBITION_DATA,
} from '@/data/business'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'international'

    if (type === 'domestic') {
      return NextResponse.json(DOMESTIC_EXHIBITION_DATA)
    } else if (type === 'international') {
      return NextResponse.json(INTERNATIONAL_EXHIBITION_DATA)
    } else {
      return NextResponse.json(
        { error: '잘못된 type 파라미터입니다.' },
        { status: 400 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: '데이터를 불러오는데 실패했습니다.' },
      { status: 500 },
    )
  }
}
