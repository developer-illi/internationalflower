import { getNoticeDetailData, getNoticeList } from '@/api/notice'
import { redirect } from 'next/navigation'
import DetailLayout from '@/components/layout/DetailLayout'
import { Metadata } from 'next'
import { removeHtmlTags } from '@/utils/html'

interface NoticeDetailProps {
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
    const notice = await getNoticeDetailData(Number(id))

    return {
      title: `${notice.title} | 국제꽃예술인협회 공지사항`,
      description: removeHtmlTags(notice.content.substring(0, 160)),
      openGraph: {
        title: notice.title,
        description: removeHtmlTags(notice.content.substring(0, 160)),
        type: 'article',
        publishedTime: notice.date,
      },
    }
  } catch (error) {
    return {
      title: '공지사항 | 국제꽃예술인협회',
    }
  }
}

export async function generateStaticParams() {
  try {
    const noticeList = await getNoticeList()

    return noticeList.map((notice) => ({
      id: notice.id.toString(),
    }))
  } catch (error) {
    return []
  }
}

export default async function NoticeDetail({ params }: NoticeDetailProps) {
  try {
    const { id } = await params
    const data = await getNoticeDetailData(Number(id))

    return (
      <DetailLayout htmlContent={data.content} href="/contents/notice">
        <section className="space-y-4">
          <h3 className="text-3xl leading-10 font-semibold break-keep">
            {data.title}
          </h3>
          <p className="text-base">{data.date}</p>
        </section>
      </DetailLayout>
    )
  } catch (error) {
    redirect('/contents/notice')
  }
}
