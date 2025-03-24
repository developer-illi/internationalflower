import { NextResponse } from 'next/server'
import { NEWS_DETAIL_DATA } from '@/data/news'

interface NewsDetailRouteProps {
  params: Promise<{
    id: string
  }>
}

export async function GET(_request: Request, { params }: NewsDetailRouteProps) {
  try {
    const { id } = await params
    if (id) {
      return NextResponse.json(NEWS_DETAIL_DATA)
    } else {
      return NextResponse.json(
        { error: '잘못된 id 파라미터입니다.' },
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
