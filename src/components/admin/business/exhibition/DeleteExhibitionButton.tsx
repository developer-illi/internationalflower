'use client'

import { useRouter } from 'next/navigation'
import { deleteDomestic, deleteOverseas } from '@/api/business'

interface DeleteExhibitionButtonProps {
  id: number
  type: 'domestic' | 'international'
  childCount?: number
}

export default function DeleteExhibitionButton({
  id,
  type,
  childCount = 0,
}: DeleteExhibitionButtonProps) {
  const router = useRouter()

  const label = type === 'domestic' ? '국내전시' : '국외전시'

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const baseMsg = `정말로 이 ${label} 탭을 삭제하시겠습니까?`
    const warnMsg =
      childCount > 0
        ? `${baseMsg}\n\n하위 갤러리 ${childCount}건이 함께 삭제됩니다.`
        : baseMsg

    if (!window.confirm(warnMsg)) return

    try {
      if (type === 'domestic') {
        await deleteDomestic(id)
      } else {
        await deleteOverseas(id)
      }
      alert('삭제되었습니다.')
      router.push(`/business/${type}`)
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
      className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
    >
      탭 삭제
    </button>
  )
}
