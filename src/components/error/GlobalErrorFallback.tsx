import { AlertTriangle } from 'lucide-react'

interface GlobalErrorFallbackProps {
  error: Error & { digest?: string; status?: number }
  resetError: () => void
}

const GlobalErrorFallback = ({
  error,
  resetError,
}: GlobalErrorFallbackProps) => {
  const navigateToMain = () => {
    resetError()
    window.location.href = '/'
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <section className="flex flex-col gap-6 items-center">
        <AlertTriangle className="h-20 w-20 text-primary" />

        <hgroup className="flex flex-col gap-2 items-center">
          <h1 className="text-xl font-bold">
            예상치 못한 문제가 발생했습니다.
          </h1>
          <h2 className="text-base">
            다시 시도하거나 나중에 다시 방문해 주세요.
          </h2>
        </hgroup>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={resetError}
            className="cursor-pointer py-3 px-6 bg-primary text-background rounded-full transition-colors"
          >
            다시 시도하기
          </button>
          <button
            onClick={navigateToMain}
            className="cursor-pointer py-3 px-6 border border-primary text-primary rounded-full transition-colors"
          >
            메인으로
          </button>
        </div>
      </section>
    </div>
  )
}

export default GlobalErrorFallback
