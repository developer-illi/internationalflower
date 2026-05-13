'use client'

import { useRouter } from 'next/navigation'
import { deleteDomesticContent, deleteOverseasContent } from '@/api/business'

interface DeleteExhibitionContentButtonProps {
  contentId: number
  type: 'domestic' | 'international'
}

export default function DeleteExhibitionContentButton({
  contentId,
  type,
}: DeleteExhibitionContentButtonProps) {
  const router = useRouter()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!window.confirm('정말로 이 항목을 삭제하시겠습니까?')) return

    try {
      if (type === 'domestic') {
        await deleteDomesticContent(contentId)
      } else {
        await deleteOverseasContent(contentId)
      }
      alert('삭제되었습니다.')
      router.refresh()
    } catch (error) {
      console.error('삭제 오류:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="absolute top-2 right-2 z-30 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700 active:scale-95"
      title="삭제하기"
    >
      <span className="text-sm font-bold">✕</span>
    </button>
  )
}
