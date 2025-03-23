'use client'

import BackButton from '@/components/button/BackButton'
import HorizontalDivider from '@/components/common/HorizontalDivider'
import LinkButton from '@/components/button/LinkButton'
import FadeInSection from '@/components/motion/FadeInSection'
import dynamic from 'next/dynamic'

const ClientHTMLContent = dynamic(
  () => import('@/components/common/HTMLContent'),
  { ssr: false },
)

interface DetailLayoutProps {
  children: React.ReactNode
  htmlContent: string
  href: string
}

const DetailLayout = ({ children, htmlContent, href }: DetailLayoutProps) => {
  return (
    <section className="mt-24 mb-40 container-layout flex flex-col items-center gap-y-12">
      <FadeInSection>
        <BackButton className="self-start" />
      </FadeInSection>

      <FadeInSection delay={1}>
        <header className="container-content pt-10">{children}</header>
      </FadeInSection>

      <FadeInSection delay={2}>
        <HorizontalDivider />
      </FadeInSection>

      <FadeInSection delay={3}>
        <ClientHTMLContent
          html={htmlContent}
          className="w-full container-content !max-w-full prose"
        />
      </FadeInSection>

      <FadeInSection delay={4}>
        <HorizontalDivider />
      </FadeInSection>

      <FadeInSection delay={5} className="text-center">
        <LinkButton href={href}>목록으로</LinkButton>
      </FadeInSection>
    </section>
  )
}

export default DetailLayout
