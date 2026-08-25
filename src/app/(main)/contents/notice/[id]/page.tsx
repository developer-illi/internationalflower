import { getNoticeDetailData, getNoticeList } from '@/api/notice'
import { redirect } from 'next/navigation'
import DetailLayout from '@/components/layout/DetailLayout'
import NoticeAttachmentList from '@/components/notice/NoticeAttachmentList'
import DeleteNoticeButton from '@/components/admin/notice/DeleteNoticeButton'
import { Metadata } from 'next'
import { removeHtmlTags } from '@/utils/html'
import { formatDate } from '@/utils/date'
import { cookies } from 'next/headers'
import Link from 'next/link'

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
    console.error('공지 메타데이터 생성 실패:', error)
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
    console.error('공지 정적 경로 생성 실패:', error)
    return []
  }
}

export default async function NoticeDetail({ params }: NoticeDetailProps) {
  const { id } = await params

  // cookies() 는 프리렌더 중 DynamicServerError 를 던져 Next 에게
  // "이 라우트는 동적" 임을 알린다. try/catch 로 감싸면 그 신호를 삼켜
  // 페이지가 통째로 리다이렉트로 렌더되므로 절대 감싸지 않는다.
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get('auth_token')?.value === 'authenticated'

  const data = await getNoticeDetailData(Number(id)).catch((error) => {
    console.error('공지 상세 조회 실패:', error)
    return null
  })

  if (!data) redirect('/contents/notice')

  return (
    <DetailLayout
      htmlContent={data.content}
      href="/contents/notice"
      footer={<NoticeAttachmentList attachments={data.attachments} />}
    >
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-3xl leading-10 font-semibold break-keep">
            {data.title}
          </h3>
          {isLoggedIn && (
            <div className="flex gap-2 shrink-0 pt-1">
              <Link
                href={`/contents/notice/${id}/edit`}
                className="px-3 py-1 text-sm bg-[#E34798] text-white rounded hover:bg-opacity-90"
              >
                수정
              </Link>
              <DeleteNoticeButton
                id={Number(id)}
                attachmentCount={data.attachments.length}
              />
            </div>
          )}
        </div>
        <p className="text-base">{formatDate(data.date)}</p>
      </section>
    </DetailLayout>
  )
}
