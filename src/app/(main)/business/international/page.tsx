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
    return []
  }
}

export default async function InternationalExhibitions({
                                                         searchParams,
                                                       }: InternationalExhibitionsProps) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  const isLoggedIn = authToken?.value === 'authenticated'
  const exhibitionData = await getExhibition('international').catch(() => [])
  const tabList = exhibitionData.map((exhibition) => exhibition.title)
  const type = 'international'
  const { tab } = await searchParams
  const activeTab = tab ?? tabList[0]
  const activeTabData =
    exhibitionData.find((exhibition) => exhibition.title === activeTab) ??
    exhibitionData[0]

  if (!activeTabData) {
    return null
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
