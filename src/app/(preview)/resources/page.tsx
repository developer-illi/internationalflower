import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Resources = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center cursor-default">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center">Resources</h1>
        <ul className="w-full flex flex-col gap-4">
          <li className="w-full">
            <Link
              href="/resources/modal"
              className="flex items-center justify-between w-full px-6 py-2 rounded-full border border-foreground hover:bg-foreground hover:text-background text-lg font-semibold text-foreground cursor-pointer transition-all duration-300"
            >
              Modal
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/resources/button"
              className="flex items-center justify-between w-full px-6 py-2 rounded-full border border-foreground hover:bg-foreground hover:text-background text-lg font-semibold text-foreground cursor-pointer transition-all duration-300"
            >
              Button
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/resources/pagination"
              className="flex items-center justify-between w-full px-6 py-2 rounded-full border border-foreground hover:bg-foreground hover:text-background text-lg font-semibold text-foreground cursor-pointer transition-all duration-300"
            >
              Pagination
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Resources
