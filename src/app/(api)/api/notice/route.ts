import { NextResponse } from 'next/server'
import { NOTICE_DATA } from '@/data/notice'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    if (search) {
      return NextResponse.json(
        NOTICE_DATA.filter((notice) =>
          notice.title.toLowerCase().includes(search.toLowerCase()),
        ),
      )
    }

    return NextResponse.json(NOTICE_DATA)
  } catch (error) {
    return NextResponse.json(
      { error: '공지사항 데이터를 불러오는데 실패했습니다.' },
      { status: 500 },
    )
  }
}
