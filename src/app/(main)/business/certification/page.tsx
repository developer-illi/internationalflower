import Breadcrumb from '@/components/common/Breadcrumb'
import TabBar from '@/components/tab/TabBar'
import HeaderImage from '@/components/motion/HeaderImage'
import FadeInSection from '@/components/motion/FadeInSection'
import { Certification as CertificationType } from '@/types/business'
import { getCertification } from '@/api/business'
import CertificationContent from '@/components/certification/CertificationContent'
import { Metadata } from 'next'

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
    return []
  }
}

export default async function Certification({
  searchParams,
}: CertificationPageProps) {
  const certificationData = await getCertification().catch(() => [])
  const tabList = certificationData.map((certification) => certification.title)

  const { tab } = await searchParams
  const activeTab = tab ?? tabList[0]
  const activeTabData =
    certificationData.find(
      (certification) => certification.title === activeTab,
    ) ?? certificationData[0]

  if (!activeTabData) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-8 py-8 overflow-x-hidden">
      <HeaderImage src={activeTabData.headerImage} alt="certification" />
      <section className="container-layout flex flex-col gap-y-8 py-4">
        <FadeInSection>
          <Breadcrumb path={['주요사업', '자격증']} />
        </FadeInSection>

        <FadeInSection delay={1}>
          <TabBar activeTab={activeTab} tabList={tabList} />
        </FadeInSection>

        <CertificationContent data={activeTabData} />
      </section>
    </div>
  )
}
