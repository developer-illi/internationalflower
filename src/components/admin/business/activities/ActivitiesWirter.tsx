'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'

export default function ActivitiesWritePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [florists, setFlorists] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, ImageExtension],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] px-4 py-3',
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

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(imageFile)
    } else {
      setPreviewUrl(null)
    }
  }, [imageFile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return alert('잘못된 접근입니다.')
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('date', date)
    formData.append('location', location)
    formData.append('florists', florists)
    formData.append('content', content)
    formData.append('description', description)
    if (imageFile) formData.append('image', imageFile)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acticontentAdd/${id}`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('저장 실패')
      alert('저장되었습니다.')
      router.push('/business/activities')
    } catch (err) {
      console.error(err)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gray-100 px-4 pt-[80px] pb-16"
    >
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="w-full aspect-[4/3] relative bg-gray-100 rounded overflow-hidden">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="미리보기"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                이미지 미리보기
              </div>
            )}
          </div>

          <div className="flex flex-col gap-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              className="border rounded p-2"
              required
            />
            <table className="text-base font-normal w-full">
              <tbody className="[&>tr>td]:py-1 [&>tr>td:first-child]:pr-4">
                <tr>
                  <td>일자</td>
                  <td>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="border rounded p-1"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>장소</td>
                  <td>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border rounded p-1 w-full"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>플로리스트</td>
                  <td>
                    <input
                      type="text"
                      value={florists}
                      onChange={(e) => setFlorists(e.target.value)}
                      placeholder="이름1, 이름2 형식"
                      className="border rounded p-1 w-full"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>간단 설명</td>
                  <td>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="간단한 설명을 입력해주세요"
                      className="border rounded p-1 w-full"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ✅ 게시판 스타일 에디터 (테두리 포함) */}
        <div className="tiptap">
          <label className="block mb-2 text-sm text-gray-600">본문 내용</label>
          <div className="border border-gray-300 rounded min-h-[300px] bg-white">
            <EditorContent editor={editor} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※ 이미지는 드래그 앤 드롭으로 추가할 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="border p-2 rounded file:bg-[#E34798] file:text-white file:px-4 file:py-2 file:rounded file:border-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              돌아가기
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#E34798] text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}