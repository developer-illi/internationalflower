import { NEWS_DATA } from '@/data/news'
import { isNewsType } from '@/utils/news'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'

    if (type === 'all') {
      return NextResponse.json(NEWS_DATA)
    } else if (isNewsType(type)) {
      return NextResponse.json(NEWS_DATA.filter((news) => news.type === type))
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
