export const dynamic = 'force-dynamic'
import { getActivity } from '@/api/business'
import EditActivityForm from '@/components/admin/business/activities/EditActivityForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface EditActivityPageProps {
  params: Promise<{ id: string }>
}

export default async function EditActivityPage({
  params,
}: EditActivityPageProps) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  if (authToken?.value !== 'authenticated') redirect('/admin')

  const { id } = await params
  const numericId = Number(id)

  const list = await getActivity().catch(() => [])
  const target = list.find((item) => item.id === numericId)
  if (!target) redirect('/business/activities')

  return (
    <EditActivityForm
      id={numericId}
      initialData={{
        title: target.title,
        content: target.content,
        headerImage: target.headerImage,
      }}
    />
  )
}
