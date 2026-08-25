import { redirect } from 'next/navigation'
import { getNoticeDetailData } from '@/api/notice'
import EditNoticeForm from '@/components/admin/notice/EditNoticeForm'

export const dynamic = 'force-dynamic'

interface EditNoticePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditNoticePage({ params }: EditNoticePageProps) {
  const { id } = await params

  const notice = await getNoticeDetailData(Number(id)).catch((error) => {
    console.error('공지 수정 화면 조회 실패:', error)
    return null
  })

  if (!notice) redirect('/contents/notice')

  return <EditNoticeForm id={Number(id)} initialData={notice} />
}
