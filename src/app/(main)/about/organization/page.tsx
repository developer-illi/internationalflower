import Title from '@/components/common/Title'
import Profile from '@/components/common/Profile'
import { getOrganization } from '@/api/about'
import FadeInSection from '@/components/motion/FadeInSection'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '조직도 | 국제꽃예술인협회',
  }
}

export default async function Organization() {
  const organizationData = await getOrganization().catch(() => null)

  if (!organizationData) {
    return null
  }

  return (
    <main className="container-layout my-40 space-y-12 cursor-default">
      <FadeInSection>
        <Title title="조직도" subTitle="임원진소개" />
      </FadeInSection>

      <FadeInSection delay={1}>
        <h2 className="text-xl sm:text-2xl font-semibold border-b border-black w-fit px-2 sm:px-4 py-2 mx-auto text-center">
          (사)국제꽃예술인 협회 임원조직도
        </h2>
      </FadeInSection>

      <div className="space-y-20 w-full">
        <FadeInSection delay={2}>
          <section className="space-y-8">
            <ul className="w-full flex justify-start lg:justify-center">
              {organizationData.president.map((profile) => (
                <li key={profile.name} className="list-none">
                  <Profile {...profile} />
                </li>
              ))}
            </ul>
          </section>
        </FadeInSection>

        <FadeInSection delay={3}>
          <section className="space-y-8">
            <ul className="flex flex-wrap justify-evenly gap-y-8 md:gap-y-12 xl:gap-y-16 gap-x-3">
              {organizationData.vicePresidents.map((profile) => (
                <li
                  key={profile.name}
                  className="list-none flex-1 lg:flex-none"
                >
                  <Profile {...profile} />
                </li>
              ))}
            </ul>
          </section>
        </FadeInSection>

        <FadeInSection delay={4}>
          <section className="space-y-8">
            <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-8 md:gap-y-12 xl:gap-y-16 gap-x-3 place-items-center xl:place-items-start">
              {organizationData.directors.map((profile) => (
                <li key={profile.name} className="list-none w-full">
                  <Profile {...profile} />
                </li>
              ))}
            </ul>
          </section>
        </FadeInSection>
      </div>
    </main>
  )
}
