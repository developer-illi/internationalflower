export const dynamic = 'force-dynamic'
import { getNewsDetailData } from '@/api/news'
import EditNewsForm from '@/components/admin/EditNewsForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface EditNewsPageProps {
  params: Promise<{ id: string }>
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  if (authToken?.value !== 'authenticated') redirect('/admin')

  const { id } = await params

  try {
    const news_data = await getNewsDetailData(Number(id))
    const news = Object.values(news_data)[0] as any
    return <EditNewsForm id={Number(id)} initialData={news} />
  } catch {
    redirect('/news')
  }
}
