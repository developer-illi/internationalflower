'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import ImageFormatNotice from '@/components/admin/ImageFormatNotice'
import { IMAGE_ACCEPT } from '@/constants/upload'
import { getApiErrorMessage } from '@/utils/error'

interface NoticeContentEditorProps {
  initialContent?: string
  onChange: (html: string) => void
}

/**
 * 공지 본문 에디터. 등록·수정 화면이 함께 쓴다.
 * 여기서 다루는 이미지는 '본문에 삽입되는 이미지'이고,
 * 다운로드용 첨부파일은 AttachmentField 가 따로 담당한다.
 */
const NoticeContentEditor = ({
  initialContent = '',
  onChange,
}: NoticeContentEditorProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const uploadAndInsertImage = useCallback(
    async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)

      setIsUploading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          // 서버가 주는 한글 사유(HEIC 안내 등)를 그대로 노출한다.
          const message = await getApiErrorMessage(
            res,
            `이미지 업로드에 실패했습니다. (${res.status})`,
          )
          console.error('이미지 업로드 실패:', res.status, message)
          alert(message)
          return
        }

        const data = await res.json()
        if (!data?.url) {
          console.error('이미지 업로드 응답에 url 없음:', data)
          alert('이미지 업로드 응답이 올바르지 않습니다.')
          return
        }

        editor?.chain().focus().setImage({ src: data.url }).run()
      } catch (err) {
        console.error('이미지 업로드 실패:', err)
        alert('이미지 업로드 중 오류가 발생했습니다.')
      } finally {
        setIsUploading(false)
      }
    },
    [editor],
  )

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) await uploadAndInsertImage(file)
  }

  useEffect(() => {
    const el = wrapperRef.current
    if (!editor || !el) return

    const handleDrop = (e: DragEvent) => {
      const file = e.dataTransfer?.files?.[0]
      if (!file || !file.type.startsWith('image/')) return
      e.preventDefault()
      void uploadAndInsertImage(file)
    }

    el.addEventListener('drop', handleDrop)
    return () => el.removeEventListener('drop', handleDrop)
  }, [editor, uploadAndInsertImage])

  return (
    <div ref={wrapperRef}>
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">본문 이미지</label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={!editor || isUploading}
          className="px-4 py-2 bg-[#E34798] text-white rounded hover:bg-opacity-90 text-sm disabled:opacity-50"
        >
          {isUploading ? '업로드 중...' : '이미지 선택'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={IMAGE_ACCEPT}
          onChange={handleImageSelect}
          className="hidden"
        />
        <ImageFormatNotice />
        <p className="text-xs text-gray-400 mt-1">
          선택한 이미지는 본문 커서 위치에 삽입됩니다. 드래그 앤 드롭도 가능합니다.
        </p>
      </div>

      <label className="block text-sm text-gray-600 mb-2">내용</label>
      <div className="border border-gray-300 rounded">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default NoticeContentEditor
