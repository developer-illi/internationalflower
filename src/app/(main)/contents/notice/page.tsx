import Title from '@/components/common/Title'
import SearchBar from '@/components/common/SearchBar'
import { Suspense } from 'react'
import Loading from '@/components/common/Loading'
import FadeInSection from '@/components/motion/FadeInSection'
import NoticeWritePostButton from '@/components/admin/notice/NoticeWriter'
import VerticalNoticeList from '@/components/notice/VerticalNoticeList'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

interface NoticeProps {
  searchParams: Promise<{
    search?: string
  }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '공지사항 | 국제꽃예술인협회',
  }
}

export default async function Notice({ searchParams }: NoticeProps) {
  const { search } = await searchParams
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  const isLoggedIn = authToken?.value === 'authenticated'

  return (
    <div className="container-layout my-40">
      <FadeInSection className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:justify-between md:items-center">
        <Title title="공지사항" />
        <Suspense fallback={<Loading />}>
          <SearchBar />
        </Suspense>
      </FadeInSection>
      {isLoggedIn && (
        <NoticeWritePostButton />
      )}
      <Suspense fallback={<Loading />}>
        <VerticalNoticeList searchKeyword={search} />
      </Suspense>
    </div>
  )
}
