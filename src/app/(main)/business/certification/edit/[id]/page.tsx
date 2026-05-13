export const dynamic = 'force-dynamic'
import { getCertification } from '@/api/business'
import EditCertificationForm from '@/components/admin/business/certification/EditCertificationForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditCertificationPage({ params }: EditPageProps) {
  const cookieStore = await cookies()
  if (cookieStore.get('auth_token')?.value !== 'authenticated') redirect('/admin')

  const { id } = await params
  const numericId = Number(id)

  const list = await getCertification().catch(() => [])
  const target = list.find((item) => item.id === numericId)
  if (!target) redirect('/business/certification')

  return (
    <EditCertificationForm
      id={numericId}
      initialData={{
        title: target.title,
        content: target.content,
        headerImage: target.headerImage,
        certification: target.certification,
      }}
    />
  )
}
