'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

export default function WritePostForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  const handleDrop = useCallback(async (e: DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      const imageUrl = data.url
      editor?.chain().focus().setImage({ src: imageUrl }).run()
    } catch (err) {
      console.error('이미지 업로드 실패:', err)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    const el = document.querySelector('.tiptap') as HTMLElement | null
    if (!el) return

    el.addEventListener('drop', handleDrop)
    return () => {
      el.removeEventListener('drop', handleDrop)
    }
  }, [editor, handleDrop])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notice_add`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('업로드 실패')
      }

      alert('게시글이 등록되었습니다!')
      setTitle('')
      setContent('')
      editor?.commands.setContent('')
      router.push('/contents/notice')
    } catch (err) {
      console.error('게시글 업로드 실패:', err)
      alert('업로드 중 문제가 발생했습니다.')
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-6 pt-28 pb-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto border border-gray-200 bg-white rounded"
      >
        {/* 상단 타이틀 */}
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-bold">공지사항</h2>
        </div>

        {/* 제목 입력 */}
        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">제목</label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* 내용 입력 */}
        <div className="px-6 py-4 tiptap">
          <label className="block text-sm text-gray-600 mb-2">내용</label>
          <div className="border border-gray-300 rounded">
            <EditorContent editor={editor} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※ 이미지는 드래그 앤 드롭으로도 추가할 수 있어요.
          </p>
        </div>

        {/* 버튼 영역 */}
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
            className="px-4 py-2 bg-[#E34798] text-white rounded"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  )
}