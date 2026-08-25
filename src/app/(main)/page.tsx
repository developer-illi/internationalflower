import ProjectCard from '@/components/card/ProjectCard'
import FadeInViewSection from '@/components/motion/FadeInViewSection'
import SectionHeader from '@/components/main/SectionHeader'
import { MAIN_PROJECTS } from '@/constants/project'
import HorizontalNoticeList from '@/components/notice/HorizontalNoticeList'
import VerticalNoticeList from '@/components/notice/VerticalNoticeList'
import HeroSection from '@/components/main/HeroSection'
import NewsList from '@/components/main/NewsList'

/**
 * 메인은 공지·소식 섹션을 서버에서 렌더링한다. 기본값(정적 프리렌더)으로 두면
 * 글을 올려도 stale-while-revalidate 로 옛 HTML 이 계속 나가므로 TTL 을 명시한다.
 * 글 등록 직후에는 revalidateContent 가 즉시 무효화한다.
 */
export const revalidate = 300

export default function Home() {

  return (
    <main className="select-none overflow-hidden">
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* Main Project 섹션 */}
      <section className="container-layout py-20 space-y-8">
        <div className="w-full">
          <FadeInViewSection>
            <SectionHeader title="main project" href="/business/domestic" />
          </FadeInViewSection>
        </div>

        <ul className="space-y-4 sm:space-y-14">
          {MAIN_PROJECTS.map((project, index) => (
            <li key={project.id}>
              <ProjectCard project={project} reverse={index % 2 === 0} />
            </li>
          ))}
        </ul>
      </section>

      {/* News 섹션 */}
      <section className="container-layout relative py-20">
        <div className="-z-10 w-screen absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-muted-background"></div>
        <div className="space-y-5">
          <FadeInViewSection>
            <SectionHeader title="news" href="/news" />
          </FadeInViewSection>

          <FadeInViewSection>
            <NewsList />
          </FadeInViewSection>
        </div>
      </section>

      {/* Notice 섹션 */}
      <section className="container-layout py-20 space-y-4">
        <FadeInViewSection>
          <SectionHeader title="notice" href="/contents/notice" />
        </FadeInViewSection>

        {/* Desktop */}
        <VerticalNoticeList className="hidden sm:block" />

        {/* Mobile */}
        <FadeInViewSection>
          <HorizontalNoticeList className="block sm:hidden" />
        </FadeInViewSection>
      </section>
    </main>
  )
}
