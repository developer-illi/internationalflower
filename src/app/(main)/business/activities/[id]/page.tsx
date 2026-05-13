import DetailLayout from '@/components/layout/DetailLayout'
import Image from 'next/image'
import Link from 'next/link'
import { getActivity, getActivityDetail } from '@/api/business'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { removeHtmlTags } from '@/utils/html'
import { cookies } from 'next/headers'
import DeleteActivityContentButton from '@/components/admin/business/activities/DeleteActivityContentButton'
// import { ac } from 'framer-motion/dist/types.d-B50aGbjN'
interface ActivitiesDetailProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  try {
    const activity = await getActivityDetail(Number(id))

    return {
      title: `${activity.title} | 국제꽃예술인협회 대외활동`,
      description: removeHtmlTags(activity.content.substring(0, 160)),
      openGraph: {
        title: activity.title,
        description: removeHtmlTags(activity.content.substring(0, 160)),
        type: 'article',
        publishedTime: activity.date,
        images: [
          {
            url: activity.mainImage,
            width: 1000,
            height: 1000,
            alt: activity.title,
          },
        ],
      },
    }
  } catch (error) {
    return {
      title: '대외활동 | 국제꽃예술인협회',
    }
  }
}

export async function generateStaticParams() {
  try {
    const activities = await getActivity()
    console.log(activities)
    return activities.map((activity) => ({
      id: activity.id.toString(),
    }))
  } catch (error) {
    return []
  }
}

export default async function ActivitiesDetail({
  params,
}: ActivitiesDetailProps) {
  const { id } = await params
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get('auth_token')?.value === 'authenticated'

  try {
    const data = await getActivityDetail(Number(id))
    return (
      <DetailLayout htmlContent={data.content} href="/business/activities">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Image
            src={data.mainImage}
            alt={data.title}
            width={1000}
            height={1000}
            className="w-full h-auto max-h-[270px] object-cover"
          />
          <div className="flex flex-col gap-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-3xl leading-10 font-semibold break-keep">
                {data.title}
              </h3>
              {isLoggedIn && (
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/business/activities/${id}/edit`}
                    className="px-3 py-1.5 text-sm bg-[#E34798] text-white rounded hover:bg-opacity-90"
                  >
                    수정
                  </Link>
                  <DeleteActivityContentButton
                    contentId={Number(id)}
                    redirectTo="/business/activities"
                    variant="inline"
                  />
                </div>
              )}
            </div>
            <table className="text-base font-normal">
              <tbody className="**:py-1">
                <tr>
                  <td>일자</td>
                  <td>{data.date}</td>
                </tr>
                <tr>
                  <td>장소</td>
                  <td>{data.location}</td>
                </tr>
                <tr>
                  <td>플로리스트</td>
                  <td>{data.florists.join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </DetailLayout>
    )
  } catch (error) {
    redirect('/business/activities')
  }
}
