import { Metadata } from 'next'
import Image from 'next/image'
import LinkButton from '@/components/button/LinkButton'

export const generateMetadata = (): Metadata => {
  return {
    title: 'Favicon A',
    icons: {
      icon: '/favicon/favicon.ico',
    },
  }
}

const FaviconA = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-xl font-bold">
        현재 페이지의 favicon은 아래와 같습니다.
      </h1>
      <Image
        src="/favicon/favicon.png"
        alt="favicon"
        width={100}
        height={100}
      />
      <LinkButton href="/favicon">이전으로</LinkButton>
    </div>
  )
}

export default FaviconA
