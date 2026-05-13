export const dynamic = 'force-dynamic'
import { getActivityDetail } from '@/api/business'
import EditActivityContentForm from '@/components/admin/business/activities/EditActivityContentForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface EditActivityContentPageProps {
  params: Promise<{ id: string }>
}

export default async function EditActivityContentPage({
  params,
}: EditActivityContentPageProps) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  if (authToken?.value !== 'authenticated') redirect('/admin')

  const { id } = await params

  try {
    const data = await getActivityDetail(Number(id))
    return <EditActivityContentForm id={Number(id)} initialData={data} />
  } catch {
    redirect('/business/activities')
  }
}
