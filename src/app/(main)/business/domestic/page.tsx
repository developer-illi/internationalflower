import { getExhibition } from '@/api/business'
import HeaderImage from '@/components/motion/HeaderImage'
import TabBar from '@/components/tab/TabBar'
import Breadcrumb from '@/components/common/Breadcrumb'
import DomesticAddBtn from '@/components/admin/business/domestic/DomesticAddBtn'
import { Exhibition } from '@/types/business'
import ExhibitionsPagination from '@/components/pagination/ExhibitionsPagination'
import FadeInSection from '@/components/motion/FadeInSection'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Empty from '@/components/common/Empty'

interface DomesticExhibitionsProps {
  searchParams: Promise<{
    tab?: string
  }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '국내전시행사 | 국제꽃예술인협회',
  }
}

export async function generateStaticParams() {
  try {
    const exhibitionData = await getExhibition('domestic')
    return exhibitionData.map((exhibition: Exhibition) => ({
      tab: exhibition.title,
    }))
  } catch (error) {
    console.error('국내전시 정적 경로 생성 실패:', error)
    return []
  }
}

export default async function DomesticExhibitions({
                                                    searchParams,
                                                  }: DomesticExhibitionsProps) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  const isLoggedIn = authToken?.value === 'authenticated'
  const exhibitionData = await getExhibition('domestic').catch((error) => {
    console.error('국내전시 목록 조회 실패:', error)
    return []
  })
  const tabList = exhibitionData.map((exhibition) => exhibition.title)
  const { tab } = await searchParams
  const type = 'domestic'
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
          <Breadcrumb path={['주요사업', '국내전시행사']} />
        </FadeInSection>
        {isLoggedIn && <DomesticAddBtn />}
        <Empty message="등록된 항목이 없습니다." />
      </section>
    )
  }

  return (
    <section className="overflow-x-hidden">
      <HeaderImage src={activeTabData.headerImage} alt="domestic exhibition" />
      <div className="container-layout flex flex-col gap-y-8 py-8">
        <FadeInSection>
          <Breadcrumb path={['주요사업', '국내전시행사']} />
        </FadeInSection>
        {isLoggedIn && (
          <DomesticAddBtn />
        )}
        <FadeInSection delay={1}>
          <TabBar activeTab={activeTab} tabList={tabList} />
        </FadeInSection>
        <ExhibitionsPagination data={activeTabData} isLoggedIn={isLoggedIn} type={type} />
      </div>
    </section>
  )
}
