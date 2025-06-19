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
    return []
  }
}

export default async function DomesticExhibitions({
                                                    searchParams,
                                                  }: DomesticExhibitionsProps) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  const isLoggedIn = authToken?.value === 'authenticated'
  const exhibitionData = await getExhibition('domestic').catch(() => [])
  const tabList = exhibitionData.map((exhibition) => exhibition.title)
  const { tab } = await searchParams
  const type = 'domestic'
  const activeTab = tab ?? tabList[0]
  const activeTabData =
    exhibitionData.find((exhibition) => exhibition.title === activeTab) ??
    exhibitionData[0]
  if (!activeTabData) {
    return null
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
