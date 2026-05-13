'use client'

import { useRouter } from 'next/navigation'
import { deleteActivity } from '@/api/business'

interface DeleteActivityButtonProps {
  activityId: number
  childCount?: number
}

export default function DeleteActivityButton({
  activityId,
  childCount = 0,
}: DeleteActivityButtonProps) {
  const router = useRouter()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const baseMsg = '정말로 이 대외활동을 삭제하시겠습니까?'
    const warnMsg =
      childCount > 0
        ? `${baseMsg}\n\n하위 활동 내역 ${childCount}건이 함께 삭제됩니다.`
        : baseMsg

    if (!window.confirm(warnMsg)) return

    try {
      await deleteActivity(activityId)
      alert('삭제되었습니다.')
      router.push('/business/activities')
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
