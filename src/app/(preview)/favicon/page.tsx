import Link from 'next/link'
import Image from 'next/image'

const Favicon = () => {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center gap-12">
      <h1 className="text-4xl font-bold text-center">Favicon 테스트</h1>
      <ul className="flex items-center justify-center gap-12">
        <li className="group px-8 py-6 rounded-xl bg-foreground hover:bg-primary cursor-pointer transition-colors">
          <Link
            href={'/favicon/a'}
            className="flex flex-col items-center gap-8 text-3xl font-semibold text-background"
          >
            <Image
              src="/favicon/favicon.png"
              alt="favicon"
              width={100}
              height={100}
              className="w-24 h-auto invert-100"
            />
            A type 보러가기
          </Link>
        </li>
        <li className="group px-8 py-6 rounded-xl bg-foreground hover:bg-primary cursor-pointer transition-colors">
          <Link
            href={'/favicon/b'}
            className="flex flex-col items-center gap-8 text-3xl font-semibold text-background"
          >
            <Image
              src="/favicon/favicon-b.png"
              alt="favicon"
              width={100}
              height={100}
              className="w-24 h-auto invert-100"
            />
            B type 보러가기
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Favicon
