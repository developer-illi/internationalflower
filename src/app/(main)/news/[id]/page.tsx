import { getNewsDetailData, getNewsList } from '@/api/news'
import Tag from '@/components/common/Tag'
import DetailLayout from '@/components/layout/DetailLayout'
import { convertTypeToLabel } from '@/utils/news'
import { removeHtmlTags } from '@/utils/html'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { type } from 'os'
// import { aw } from 'framer-motion/dist/types.d-B50aGbjN'

interface NewsDetailProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  try {
    const { id } = await params
    const news = await getNewsDetailData(Number(id))

    return {
      title: `${news.title} | 국제꽃예술인협회 소식`,
      description: removeHtmlTags(news.content.substring(0, 160)),
      openGraph: {
        title: news.title,
        description: removeHtmlTags(news.content.substring(0, 160)),
        type: 'article',
        publishedTime: news.date,
      },
    }
  } catch (error) {
    return {
      title: '협회소식 | 국제꽃예술인협회',
    }
  }
}

export async function generateStaticParams() {
  try {
    const newsList = await getNewsList('all')
    return newsList.map((news) => ({
      id: news.id.toString(),
    }))
  } catch (error) {
    return []
  }
}

export default async function NewsDetail({ params }: NewsDetailProps) {
  try {
    const { id } = await params
    const news_data = await getNewsDetailData(Number(id))
    const news = Object.values(news_data)[0]
    return (
      <DetailLayout htmlContent={news.content} href="/news">
        <section className="space-y-4">
          <Tag>{convertTypeToLabel(news.type)}</Tag>
          <h3 className="text-3xl leading-10 font-semibold break-keep">
            {news.title}
          </h3>
          <p className="text-base">{news.date}</p>
        </section>
      </DetailLayout>
    )
  } catch (error) {
    console.log('---공지사이트 에러발생----')
    console.log(error)
    redirect('/news')
  }
}
