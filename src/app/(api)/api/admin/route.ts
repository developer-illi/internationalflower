import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')

  const isLoggedIn = authToken?.value === 'authenticated'

  return NextResponse.json({ isLoggedIn })
}