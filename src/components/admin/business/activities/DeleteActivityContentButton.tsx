'use client'

import { useRouter } from 'next/navigation'
import { deleteActivityContent } from '@/api/business'

interface DeleteActivityContentButtonProps {
  contentId: number
  redirectTo?: string
  variant?: 'card' | 'inline'
}

export default function DeleteActivityContentButton({
  contentId,
  redirectTo,
  variant = 'card',
}: DeleteActivityContentButtonProps) {
  const router = useRouter()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!window.confirm('정말로 이 활동 내역을 삭제하시겠습니까?')) return

    try {
      await deleteActivityContent(contentId)
      alert('삭제되었습니다.')
      if (redirectTo) router.push(redirectTo)
      router.refresh()
    } catch (error) {
      console.error('삭제 오류:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={handleDelete}
        type="button"
        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
      >
        삭제
      </button>
    )
  }

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700 active:scale-95"
      title="삭제하기"
    >
      <span className="text-sm font-bold">✕</span>
    </button>
  )
}
