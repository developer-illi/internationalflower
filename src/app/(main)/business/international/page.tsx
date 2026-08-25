import Breadcrumb from '@/components/common/Breadcrumb'
import HeaderImage from '@/components/motion/HeaderImage'
import FadeInSection from '@/components/motion/FadeInSection'
import TabBar from '@/components/tab/TabBar'
import ExhibitionsPagination from '@/components/pagination/ExhibitionsPagination'
import { getExhibition } from '@/api/business'
import { Exhibition } from '@/types/business'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import International_modal from '@/components/admin/business/international/InternationalAddBtn'
import Empty from '@/components/common/Empty'

interface InternationalExhibitionsProps {
  searchParams: Promise<{
    tab?: string
  }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '해외전시행사 | 국제꽃예술인협회',
  }
}

export async function generateStaticParams() {
  try {
    const exhibitionData = await getExhibition('international')
    return exhibitionData.map((exhibition: Exhibition) => ({
      tab: exhibition.title,
    }))
  } catch (error) {
    console.error('해외전시 정적 경로 생성 실패:', error)
    return []
  }
}

export default async function InternationalExhibitions({
                                                         searchParams,
                                                       }: InternationalExhibitionsProps) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  const isLoggedIn = authToken?.value === 'authenticated'
  const exhibitionData = await getExhibition('international').catch((error) => {
    console.error('해외전시 목록 조회 실패:', error)
    return []
  })
  const tabList = exhibitionData.map((exhibition) => exhibition.title)
  const type = 'international'
  const { tab } = await searchParams
  const activeTab = tab ?? tabList[0]
  const activeTabData =
    exhibitionData.find((exhibition) => exhibition.title === activeTab) ??
    exhibitionData[0]

  // 목록이 비었거나 백엔드 조회가 실패한 경우. 예전에는 null 을 반환해
  // 페이지가 통째로 백지가 됐다. 최소한 안내와 등록 버튼은 남긴다.
  if (!activeTabData) {
    return (
      <section className="container-layout flex flex-col gap-y-8 py-40">
        <FadeInSection>
          <Breadcrumb path={['주요사업', '해외전시행사']} />
        </FadeInSection>
        {isLoggedIn && <International_modal />}
        <Empty message="등록된 항목이 없습니다." />
      </section>
    )
  }

  return (
    <section className="overflow-x-hidden">
      <HeaderImage
        src={activeTabData.headerImage}
        alt="international exhibitions"
      />
      <div className="container-layout flex flex-col gap-y-8 py-8">
        <FadeInSection>
          <Breadcrumb path={['주요사업', '해외전시행사']} />
        </FadeInSection>
        {isLoggedIn && (
          <International_modal />
        )}
        <FadeInSection delay={1}>
          <TabBar activeTab={activeTab} tabList={tabList} />
        </FadeInSection>
        <ExhibitionsPagination data={activeTabData} isLoggedIn={isLoggedIn} type={type}/>
      </div>
    </section>
  )
}
