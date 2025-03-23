import { NextResponse } from 'next/server'
import { CERTIFICATION_DATA } from '@/data/business'

export async function GET() {
  try {
    return NextResponse.json(CERTIFICATION_DATA)
  } catch (error) {
    return NextResponse.json(
      { error: '데이터를 불러오는데 실패했습니다.' },
      { status: 500 },
    )
  }
}
