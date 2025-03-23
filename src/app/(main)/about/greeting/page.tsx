import { getGreeting } from '@/api/about'
import HeaderImage from '@/components/motion/HeaderImage'
import Title from '@/components/common/Title'
import FadeInSection from '@/components/motion/FadeInSection'
import Image from 'next/image'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '인사말 | 국제꽃예술인협회',
  }
}

export default async function Greeting() {
  const greeting = await getGreeting().catch(() => null)

  if (!greeting) {
    return null
  }

  return (
    <section className="container-layout relative w-full h-full flex flex-col items-center overflow-x-hidden">
      <HeaderImage src="/images/hero.png" alt="greeting" />
      <article className="relative space-y-8 pb-40">
        <FadeInSection delay={0}>
          <Title title="인사말" className="mb-14 mt-20" />
        </FadeInSection>

        <FadeInSection delay={1}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold sm:font-normal break-keep">
            {greeting.title}
          </h2>
        </FadeInSection>

        <FadeInSection delay={2} className="space-y-8">
          <p className="text-base md:text-lg font-normal leading-8 whitespace-pre-wrap break-keep">
            {greeting.content}
          </p>
          <p className="text-lg md:text-xl font-normal">
            {greeting.writer.association}
          </p>
          <p className="text-lg md:text-xl font-normal align-baseline">
            {greeting.writer.position}
            <span className="text-xl sm:text-2xl md:text-3xl font-normal pl-6 whitespace-pre">
              {greeting.writer.name}
            </span>
          </p>
        </FadeInSection>

        {/* 배경 로고 */}
        <div className="absolute bottom-1/5 right-1/12 aspect-square w-2/5 md:w-1/3 -z-10 pointer-events-none">
          <Image
            src="/images/logo.svg"
            alt="background logo"
            fill
            className="object-contain opacity-10 w-full h-auto"
          />
        </div>
      </article>
    </section>
  )
}
