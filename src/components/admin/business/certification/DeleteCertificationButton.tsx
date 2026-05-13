'use client'

import { useRouter } from 'next/navigation'
import { deleteCertification } from '@/api/business'

interface DeleteCertificationButtonProps {
  id: number
}

export default function DeleteCertificationButton({ id }: DeleteCertificationButtonProps) {
  const router = useRouter()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!window.confirm('정말로 이 자격증을 삭제하시겠습니까?')) return

    try {
      await deleteCertification(id)
      alert('삭제되었습니다.')
      router.push('/business/certification')
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
