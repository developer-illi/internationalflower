import NaverMap from '@/components/map/NaverMap'
import Title from '@/components/common/Title'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import FadeInViewSection from '@/components/motion/FadeInViewSection'
import { getContactInformation } from '@/api/about'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'CONTACT | 국제꽃예술인협회',
  }
}

export default async function Contact() {
  const data = await getContactInformation().catch(() => null)

  if (!data) {
    return null
  }

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
      />
      <div className="container-layout my-40">
        <FadeInViewSection delay={0.2}>
          <Title title="CONTACT US" />
        </FadeInViewSection>

        <FadeInViewSection delay={0.4}>
          <section className="relative mt-10 grid grid-cols-1 lg:grid-cols-5 w-full h-2/3 lg:shadow-lg p-3">
            <div className="lg:col-span-2 flex flex-col gap-4 py-8 lg:py-20">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={222}
                height={222}
                className="self-center max-w-[200px] md:max-w-[222px] w-full h-auto"
              />
              <h2 className="text-xl md:text-2xl font-black mt-10 mb-8 px-6 text-center lg:text-left">
                {data.name}
              </h2>
              <ul className="text-sm md:text-base font-normal space-y-6 px-6">
                <li className="flex items-center gap-4 lg:gap-6 whitespace-nowrap">
                  <Image
                    src="/icons/phone.svg"
                    alt="phone"
                    width={24}
                    height={24}
                    className="w-auto h-full"
                  />
                  <Link href={`tel:${data.phone}`}>{data.phone}</Link>
                </li>
                <li className="flex items-center gap-4 lg:gap-6 whitespace-nowrap">
                  <Image
                    src="/icons/email.svg"
                    alt="email"
                    width={24}
                    height={24}
                    className="w-auto h-full"
                  />
                  <Link href={`mailto:${data.email}`}>{data.email}</Link>
                </li>
                <li className="flex items-start gap-4 lg:gap-6 break-keep">
                  <Image
                    src="/icons/location.svg"
                    alt="location"
                    width={24}
                    height={24}
                    className="w-auto h-full"
                  />
                  <address className="break-keep not-italic">
                    {data.address}
                  </address>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-3 relative flex-1 w-full h-auto aspect-video lg:aspect-auto">
              <NaverMap
                description="성북로5길 37-2"
                latitude={data.location.latitude}
                longitude={data.location.longitude}
              />
            </div>
          </section>
        </FadeInViewSection>
      </div>
    </>
  )
}
