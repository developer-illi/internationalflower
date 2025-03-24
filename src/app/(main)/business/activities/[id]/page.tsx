import DetailLayout from '@/components/layout/DetailLayout'
import Image from 'next/image'
import { getActivity, getActivityDetail } from '@/api/business'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { removeHtmlTags } from '@/utils/html'
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
            <h3 className="text-3xl leading-10 font-semibold break-keep">
              {data.title}
            </h3>
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
