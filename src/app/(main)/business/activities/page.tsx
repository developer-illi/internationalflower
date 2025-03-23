import Breadcrumb from '@/components/common/Breadcrumb'
import TabBar from '@/components/tab/TabBar'
import HeaderImage from '@/components/motion/HeaderImage'
import FadeInSection from '@/components/motion/FadeInSection'
import { Activity } from '@/types/business'
import { getActivity } from '@/api/business'
import ActivitiesPagination from '@/components/pagination/ActivitiesPagination'
import { Metadata } from 'next'

interface ExternalActivitiesProps {
  searchParams: Promise<{
    tab?: string
  }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '대외활동 | 국제꽃예술인협회',
  }
}

export async function generateStaticParams() {
  try {
    const activityData = await getActivity()
    return activityData.map((activity: Activity) => ({
      tab: activity.title,
    }))
  } catch (error) {
    return []
  }
}

export default async function ExternalActivities({
  searchParams,
}: ExternalActivitiesProps) {
  const activityData = await getActivity().catch(() => [])
  const tabList = activityData.map((activity) => activity.title)

  const { tab } = await searchParams
  const activeTab = tab ?? tabList[0]
  const activeTabData =
    activityData.find((activity) => activity.title === activeTab) ??
    activityData[0]

  if (!activeTabData) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-y-8 py-8 overflow-x-hidden">
      <HeaderImage src={activeTabData.headerImage} alt="external activities" />
      <section className="container-layout flex flex-col gap-y-8 py-4">
        <FadeInSection>
          <Breadcrumb path={['주요사업', '대외활동']} />
        </FadeInSection>

        <FadeInSection delay={1}>
          <TabBar activeTab={activeTab} tabList={tabList} />
        </FadeInSection>

        <ActivitiesPagination data={activeTabData} />
      </section>
    </div>
  )
}
