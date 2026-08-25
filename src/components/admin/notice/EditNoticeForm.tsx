'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NoticeContentEditor from '@/components/admin/notice/NoticeContentEditor'
import AttachmentField from '@/components/admin/notice/AttachmentField'
import { deleteNoticeAttachment, updateNotice } from '@/api/notice'
import { revalidateContent } from '@/app/actions/revalidate'
import { CONTENT_TAGS } from '@/constants/cache'
import { toUserMessage } from '@/utils/error'
import { NoticeAttachment, NoticeDetail } from '@/types/notice'

interface EditNoticeFormProps {
  id: number
  initialData: NoticeDetail
}

export default function EditNoticeForm({ id, initialData }: EditNoticeFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData.title)
  // 본문을 건드리지 않고 저장해도 기존 내용이 유지되도록 초기값을 그대로 담아둔다.
  const [content, setContent] = useState(initialData.content)
  const [existing, setExisting] = useState<NoticeAttachment[]>(
    initialData.attachments,
  )
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRemoveExisting = async (attachment: NoticeAttachment) => {
    if (!window.confirm(`'${attachment.name}' 첨부파일을 삭제하시겠습니까?`)) return

    try {
      await deleteNoticeAttachment(attachment.id)
      setExisting((prev) => prev.filter((item) => item.id !== attachment.id))
      await revalidateContent(CONTENT_TAGS.notice)
    } catch (error) {
      console.error('첨부파일 삭제 실패:', error)
      alert(toUserMessage(error, '첨부파일 삭제 중 오류가 발생했습니다.'))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }
    if (!window.confirm('수정하시겠습니까?')) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    // 새로 고른 파일만 보낸다. 기존 첨부는 서버가 그대로 유지한다.
    newFiles.forEach((file) => formData.append('files', file))

    setIsSubmitting(true)
    try {
      await updateNotice(id, formData)
      await revalidateContent(CONTENT_TAGS.notice)
      alert('수정되었습니다!')
      router.push(`/contents/notice/${id}`)
      router.refresh()
    } catch (err) {
      console.error('공지 수정 실패:', err)
      alert(toUserMessage(err, '수정 중 오류가 발생했습니다.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-6 pt-28 pb-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto border border-gray-200 bg-white rounded"
      >
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-bold">공지사항 수정</h2>
        </div>

        {/* 제목 */}
        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* 본문 */}
        <div className="px-6 py-4 border-b">
          <NoticeContentEditor
            initialContent={initialData.content}
            onChange={setContent}
          />
        </div>

        {/* 첨부파일 */}
        <div className="px-6 py-4 border-b">
          <AttachmentField
            files={newFiles}
            onFilesChange={setNewFiles}
            existing={existing}
            onRemoveExisting={handleRemoveExisting}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#E34798] text-white rounded disabled:opacity-50"
          >
            {isSubmitting ? '수정 중...' : '수정 완료'}
          </button>
        </div>
      </form>
    </div>
  )
}
