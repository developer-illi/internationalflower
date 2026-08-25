import Breadcrumb from '@/components/common/Breadcrumb'
import TabBar from '@/components/tab/TabBar'
import HeaderImage from '@/components/motion/HeaderImage'
import FadeInSection from '@/components/motion/FadeInSection'
import { Activity } from '@/types/business'
import { getActivity } from '@/api/business'
import ActivitiesPagination from '@/components/pagination/ActivitiesPagination'
import ActivitiesModal from '@/components/admin/business/activities/ActivitiesAddBtn'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Empty from '@/components/common/Empty'

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
    console.error('대외활동 정적 경로 생성 실패:', error)
    return []
  }
}

export default async function ExternalActivities({
  searchParams,
}: ExternalActivitiesProps) {
  const activityData = await getActivity().catch((error) => {
    console.error('대외활동 목록 조회 실패:', error)
    return []
  })
  const tabList = activityData.map((activity) => activity.title)
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  const isLoggedIn = authToken?.value === 'authenticated'
  const { tab } = await searchParams
  const activeTab = tab ?? tabList[0]
  const activeTabData =
    activityData.find((activity) => activity.title === activeTab) ??
    activityData[0]
  // 목록이 비었거나 백엔드 조회가 실패한 경우. 예전에는 null 을 반환해
  // 페이지가 통째로 백지가 됐다. 최소한 안내와 등록 버튼은 남긴다.
  if (!activeTabData) {
    return (
      <section className="container-layout flex flex-col gap-y-8 py-40">
        <FadeInSection>
          <Breadcrumb path={['주요사업', '대외활동']} />
        </FadeInSection>
        {isLoggedIn && <ActivitiesModal />}
        <Empty message="등록된 항목이 없습니다." />
      </section>
    )
  }

  return (
    <div className="flex flex-col items-center gap-y-8 py-8 overflow-x-hidden">
      <HeaderImage src={activeTabData.headerImage} alt="external activities" />
      <section className="container-layout flex flex-col gap-y-8 py-4">
        <FadeInSection>
          <Breadcrumb path={['주요사업', '대외활동']} />
        </FadeInSection>
        {isLoggedIn && (
          <ActivitiesModal/>
        )}
        <FadeInSection delay={1}>
          <TabBar activeTab={activeTab} tabList={tabList} />
        </FadeInSection>
        <ActivitiesPagination data={activeTabData} isLoggedIn={isLoggedIn} />
      </section>
    </div>
  )
}
