import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <h1 className="text-8xl font-bold text-foreground/20">404</h1>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-foreground text-sm">
            요청하신 페이지가 삭제되었거나 잘못된 경로입니다
          </p>
        </div>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-foreground text-white font-semibold 
                     hover:bg-primary transition-all duration-300"
        >
          메인으로
        </Link>
      </div>
    </div>
  )
}
