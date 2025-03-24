import LinkButton from '@/components/button/LinkButton'
import Loading from '@/components/common/Loading'
import PreviewCurrentPage from '@/components/preview/PreviewCurrentPage'
import { Suspense } from 'react'

const PaginationPreview = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center cursor-default">
      <Suspense fallback={<Loading />}>
        <PreviewCurrentPage />
      </Suspense>

      <LinkButton href="/resources" className="mt-4">
        이전으로
      </LinkButton>
    </div>
  )
}

export default PaginationPreview
