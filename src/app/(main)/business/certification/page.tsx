import Breadcrumb from '@/components/common/Breadcrumb'
import TabBar from '@/components/tab/TabBar'
import HeaderImage from '@/components/motion/HeaderImage'
import FadeInSection from '@/components/motion/FadeInSection'
import { Certification as CertificationType } from '@/types/business'
import { getCertification } from '@/api/business'
import CertificationContent from '@/components/certification/CertificationContent'
import { Metadata } from 'next'
import {cookies} from 'next/headers'
import LicenseAddModal from '@/components/admin/business/certification/LisenceAddBtn'
import Empty from '@/components/common/Empty'

interface CertificationPageProps {
  searchParams: Promise<{
    tab?: string
  }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '자격증 | 국제꽃예술인협회',
  }
}

export async function generateStaticParams() {
  try {
    const certificationData = await getCertification()
    return certificationData.map((certification: CertificationType) => ({
      tab: certification.title,
    }))
  } catch (error) {
    console.error('자격증 정적 경로 생성 실패:', error)
    return []
  }

}

export default async function Certification({
  searchParams,
}: CertificationPageProps) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')
  const isLoggedIn = authToken?.value === 'authenticated'
  const certificationData = await getCertification().catch((error) => {
    console.error('자격증 목록 조회 실패:', error)
    return []
  })
  const tabList = certificationData.map((certification) => certification.title)
  const { tab } = await searchParams
  const activeTab = tab ?? tabList[0]
  const activeTabData =
    certificationData.find(
      (certification) => certification.title === activeTab,
    ) ?? certificationData[0]
  // 목록이 비었거나 백엔드 조회가 실패한 경우. 예전에는 null 을 반환해
  // 페이지가 통째로 백지가 됐다. 최소한 안내와 등록 버튼은 남긴다.
  if (!activeTabData) {
    return (
      <section className="container-layout flex flex-col gap-y-8 py-40">
        <FadeInSection>
          <Breadcrumb path={['주요사업', '자격증']} />
        </FadeInSection>
        {isLoggedIn && <LicenseAddModal />}
        <Empty message="등록된 항목이 없습니다." />
      </section>
    )
  }

  return (
    <div className="flex flex-col gap-y-8 py-8 overflow-x-hidden">
      <HeaderImage src={activeTabData.headerImage} alt="certification" />
      <section className="container-layout flex flex-col gap-y-8 py-4">
        <FadeInSection>
          <Breadcrumb path={['주요사업', '자격증']} />
        </FadeInSection>
        {isLoggedIn && (
          <LicenseAddModal/>
        )}
        <FadeInSection delay={1}>
          <TabBar activeTab={activeTab} tabList={tabList} />
        </FadeInSection>

        <CertificationContent data={activeTabData} isLoggedIn={isLoggedIn} />
      </section>
    </div>
  )
}
