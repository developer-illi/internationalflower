import HistoryContent from '@/components/history/HistoryContent'

import { getHistory } from '@/api/about'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '연혁 | 국제꽃예술인협회',
  }
}

export default async function History() {
  const sections = await getHistory().catch(() => [])
  const authToken = (await cookies()).get('auth_token')
  const isLoggedIn = authToken?.value === 'authenticated'
  return <HistoryContent sections={sections} isLoggedIn={isLoggedIn} />
}
