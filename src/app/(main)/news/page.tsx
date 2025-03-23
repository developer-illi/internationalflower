import { Suspense } from 'react'
import { NEWS_TYPE } from '@/types/news'
import FadeInSection from '@/components/motion/FadeInSection'
import Title from '@/components/common/Title'
import NewsCard from '@/components/card/NewsCard'
import Pagination from '@/components/pagination/Pagination'
import Loading from '@/components/common/Loading'
import Empty from '@/components/common/Empty'
import { isNewsType } from '@/utils/news'
import Link from 'next/link'
import { getNewsList } from '@/api/news'
import { Metadata } from 'next'

interface NewsProps {
  searchParams: Promise<{
    type?: string
  }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '협회소식 | 국제꽃예술인협회',
  }
}

export default async function News({ searchParams }: NewsProps) {
  const { type } = await searchParams
  const currentType = isNewsType(type) ? type : 'all'
  const newsList = await getNewsList(currentType).catch((_error) => {
    return []
  })

  return (
    <Suspense fallback={<Loading />}>
      <div className="container-layout my-40">
        <FadeInSection>
          <Title title="협회소식" />
        </FadeInSection>

        <FadeInSection delay={1}>
          <ul className="flex gap-x-4 py-8">
            {Object.entries(NEWS_TYPE).map(([type, label]) => (
              <li
                key={type}
                className={`text-base font-semibold cursor-pointer ${
                  type === currentType ? 'text-primary' : 'text-foreground'
                }`}
              >
                <Link href={`/news?type=${type}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </FadeInSection>

        <FadeInSection delay={2}>
          {newsList.length > 0 ? (
            <Pagination>
              {newsList.map((news, _index) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </Pagination>
          ) : (
            <Empty message="등록된 협회소식이 없습니다." />
          )}
        </FadeInSection>
      </div>
    </Suspense>
  )
}
