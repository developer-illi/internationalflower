'use client'

import { useRouter } from 'next/navigation'

interface DeleteNewsButtonProps {
  newsId: number | string
}

export default function DeleteNewsButton({ newsId }: DeleteNewsButtonProps) {
  const router = useRouter()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) return

    try {
      // ⚠️ Django URL 설정이 path('news_delte/', ...) 이고
      // 뷰에서 id 인자를 받는다면 보통 아래 형식을 사용합니다.
      // 만약 404가 뜬다면 `${process.env.NEXT_PUBLIC_API_URL}/news_delte/?id=${newsId}` 로 시도해보세요.
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news_delte/${newsId}`, {
        method: 'GET', // Django 뷰가 @api_view(['GET']) 이므로
      })

      if (res.ok) {
        alert('삭제되었습니다.')
        router.refresh()
      } else {
        const errorData = await res.json()
        alert(errorData.detail || '삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('삭제 오류:', error)
      alert('서버와 통신 중 오류가 발생했습니다.')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700 active:scale-95"
      title="삭제하기"
    >
      <span className="text-sm font-bold">✕</span>
    </button>
  )
}