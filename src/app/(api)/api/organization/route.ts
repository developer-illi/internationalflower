import { NextResponse } from 'next/server'
import { ORGANIZATION_DATA } from '@/data/about'

export async function GET() {
  try {
    return NextResponse.json(ORGANIZATION_DATA)
  } catch (error) {
    return NextResponse.json(
      { error: '조직도 데이터를 불러오는데 실패했습니다.' },
      { status: 500 },
    )
  }
}
