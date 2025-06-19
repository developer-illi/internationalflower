import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const CORRECT_PASSWORD = process.env.SITE_PASSWORD

export async function POST(request: Request) {
  const body = await request.json()
  const { password } = body

  if (password === CORRECT_PASSWORD) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('auth_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1, // 1 time
    })

    return response
  }

  return NextResponse.json(
    { success: false, message: '비밀번호가 올바르지 않습니다.' },
    { status: 401 },
  )
}
