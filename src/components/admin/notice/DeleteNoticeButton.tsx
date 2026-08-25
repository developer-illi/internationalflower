'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteNotice } from '@/api/notice'
import { revalidateContent } from '@/app/actions/revalidate'
import { CONTENT_TAGS } from '@/constants/cache'
import { toUserMessage } from '@/utils/error'

interface DeleteNoticeButtonProps {
  id: number
  attachmentCount?: number
}

export default function DeleteNoticeButton({
  id,
  attachmentCount = 0,
}: DeleteNoticeButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const baseMsg = '정말로 이 공지사항을 삭제하시겠습니까?'
    const message =
      attachmentCount > 0
        ? `${baseMsg}\n\n첨부파일 ${attachmentCount}건도 함께 삭제됩니다.`
        : baseMsg

    if (!window.confirm(message)) return

    setIsDeleting(true)
    try {
      await deleteNotice(id)
      await revalidateContent(CONTENT_TAGS.notice)
      alert('삭제되었습니다.')
      router.push('/contents/notice')
      router.refresh()
    } catch (error) {
      console.error('삭제 오류:', error)
      alert(toUserMessage(error, '삭제 중 오류가 발생했습니다.'))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  )
}
