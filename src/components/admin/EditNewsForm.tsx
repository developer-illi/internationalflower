'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { updateNews } from '@/api/news'

interface EditNewsFormProps {
  id: number
  initialData: {
    title: string
    content: string
    type: string
    sub_title: string | null
    image: string | null
  }
}

export default function EditNewsForm({ id, initialData }: EditNewsFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData.title || '')
  const [subTitle, setSubTitle] = useState(initialData.sub_title || '')
  const [category, setCategory] = useState(initialData.type || 'issues')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: initialData.content || '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
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
      editor?.chain().focus().setImage({ src: data.url }).run()
    } catch (err) {
      console.error('이미지 업로드 실패:', err)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    const el = document.querySelector('.tiptap') as HTMLElement | null
    if (!el) return
    el.addEventListener('drop', handleDrop)
    return () => el.removeEventListener('drop', handleDrop)
  }, [editor, handleDrop])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!window.confirm('수정하시겠습니까?')) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('sub_title', subTitle)
    formData.append('category', category)
    formData.append('content', editor?.getHTML() || '')
    if (selectedImage) formData.append('image', selectedImage)

    try {
      await updateNews(id, formData)
      alert('수정되었습니다!')
      router.push(`/news/${id}`)
      router.refresh()
    } catch {
      alert('수정 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 pt-28 pb-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto border border-gray-200 bg-white rounded"
      >
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-bold">소식 수정</h2>
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">분류</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="issues">최근이슈</option>
            <option value="report">보도자료</option>
          </select>
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">서브 타이틀</label>
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="px-6 pt-6 border-b pb-4">
          <label className="block text-sm text-gray-600 mb-2">대표 이미지 교체</label>
          {initialData.image && (
            <p className="text-xs text-gray-400 mb-2">현재 이미지: {initialData.image}</p>
          )}
          <label
            htmlFor="image-upload"
            className="cursor-pointer inline-block px-4 py-2 bg-[#E34798] text-white rounded hover:bg-opacity-90 text-sm"
          >
            이미지 선택
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
            className="hidden"
          />
          {selectedImage && (
            <p className="text-sm text-gray-500 mt-2">선택된 파일: {selectedImage.name}</p>
          )}
        </div>

        <div className="px-6 py-4 tiptap">
          <label className="block text-sm text-gray-600 mb-2">내용</label>
          <div className="border border-gray-300 rounded">
            <EditorContent editor={editor} />
          </div>
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
            className="px-4 py-2 bg-[#E34798] text-white rounded hover:bg-opacity-90"
          >
            수정 완료
          </button>
        </div>
      </form>
    </div>
  )
}
