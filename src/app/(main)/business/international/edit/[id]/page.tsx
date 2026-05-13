export const dynamic = 'force-dynamic'
import { getExhibition } from '@/api/business'
import EditExhibitionForm from '@/components/admin/business/exhibition/EditExhibitionForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditInternationalPage({ params }: EditPageProps) {
  const cookieStore = await cookies()
  if (cookieStore.get('auth_token')?.value !== 'authenticated') redirect('/admin')

  const { id } = await params
  const numericId = Number(id)

  const list = await getExhibition('international').catch(() => [])
  const target = list.find((item) => item.id === numericId)
  if (!target) redirect('/business/international')

  return (
    <EditExhibitionForm
      id={numericId}
      type="international"
      initialData={{
        title: target.title,
        subTitle: target.subTitle,
        content: target.content,
        headerImage: target.headerImage,
      }}
    />
  )
}
