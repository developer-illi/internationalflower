import Image from 'next/image'
import Title from '@/components/common/Title'
import FadeInSection from '@/components/motion/FadeInSection'
import { getCorporationIdentity } from '@/api/about'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'CI/BI | 국제꽃예술인협회',
  }
}

export default async function CorporateIdentity() {
  const data = await getCorporationIdentity()

  return (
    <div className="container-layout my-40 space-y-10 cursor-default">
      <FadeInSection delay={0}>
        <Title title="CI/BI" />
      </FadeInSection>

      <FadeInSection delay={1}>
        <p className="text-xl sm:text-2xl font-semibold border-b border-black w-fit px-12 py-2 mx-auto text-center">
          CORPORATE IDENTITY
        </p>
      </FadeInSection>

      <FadeInSection delay={2}>
        <p className="text-base font-normal leading-8">{data.content}</p>
      </FadeInSection>

      <FadeInSection delay={3}>
        <Image
          src="/images/cibi/cibi-1.svg"
          alt=""
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </FadeInSection>

      <FadeInSection delay={4}>
        <dl className="mt-20 container-content grid md:grid-cols-2 grid-cols-1 md:gap-x-8 md:gap-y-10 gap-y-6">
          <dt className="text-3xl font-semibold md:col-span-2">
            Logotype Configuration
          </dt>
          <dd>{data.logotypeConfiguration}</dd>
          <dd className="w-full grid grid-cols-3 gap-x-4">
            <div className="col-span-2 place-items-center">
              <Image
                src="/images/cibi/cibi-2.svg"
                alt=""
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <p className="text-sm font-normal text-nowrap">Minimum Size</p>
              <Image
                src="/images/cibi/cibi-3.svg"
                alt=""
                width={300}
                height={300}
                className="w-40 h-auto self-center"
              />
            </div>
          </dd>

          <dt className="text-3xl font-semibold md:col-span-2">Symbol Mark</dt>
          <dd>{data.symbolMark}</dd>
          <dd className="w-full grid grid-cols-3 gap-x-4">
            <div className="col-span-2 place-items-center">
              <Image
                src="/images/cibi/cibi-4.svg"
                alt=""
                width={300}
                height={300}
                className="w-48 h-auto"
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <p className="text-sm font-normal text-nowrap">Minimum Size</p>
              <Image
                src="/images/cibi/cibi-5.svg"
                alt=""
                width={300}
                height={300}
                className="w-16 h-auto self-center"
              />
            </div>
          </dd>

          <dt className="text-3xl font-semibold md:col-span-2">Color System</dt>
          <dd>{data.colorSystem}</dd>
          <dd className="space-y-4 text-sm font-normal">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-3 sm:col-span-1">
                <Image
                  src="/images/cibi/cibi-6.svg"
                  alt=""
                  width={300}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div className="col-span-3 sm:col-span-2 flex justify-between">
                <div className="flex flex-col items-start">
                  <p>R: 227</p>
                  <p>G: 36</p>
                  <p>B: 73</p>
                </div>
                <div className="flex flex-col items-start">
                  <p>C: 2</p>
                  <p>M: 95</p>
                  <p>Y: 58</p>
                  <p>K: 0</p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-nowrap">HEX: #E32449</p>
                  <p className="text-nowrap">PANTONE 192 C</p>
                </div>
              </div>

              <div className="col-span-3 sm:col-span-1">
                <Image
                  src="/images/cibi/cibi-7.svg"
                  alt=""
                  width={300}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div className="col-span-3 sm:col-span-2 flex justify-between">
                <div className="flex flex-col items-start">
                  <p>R: 35</p>
                  <p>G: 24</p>
                  <p>B: 21</p>
                </div>
                <div className="flex flex-col items-start">
                  <p>C: 0</p>
                  <p>M: 0</p>
                  <p>Y: 0</p>
                  <p>K: 100</p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-nowrap">HEX: #231815</p>
                  <p className="text-nowrap">PANTONE 532 C</p>
                </div>
              </div>
            </div>
          </dd>

          <dt className="text-3xl font-semibold md:col-span-2">Symbol Mark2</dt>
          <dd className="space-y-4">{data.symbolMark2}</dd>
          <dd className="w-full grid grid-cols-3 gap-x-4">
            <div className="col-span-2">
              <Image
                src="/images/cibi/cibi-8.svg"
                alt=""
                width={300}
                height={300}
                className="w-48 h-auto"
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <p className="text-sm font-normal text-nowrap">Minimum Size</p>
              <Image
                src="/images/cibi/cibi-9.svg"
                alt=""
                width={300}
                height={300}
                className="w-16 h-auto self-center"
              />
            </div>
          </dd>
        </dl>
      </FadeInSection>
    </div>
  )
}
