'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import { updateActivityContent } from '@/api/business'

interface EditActivityContentFormProps {
  id: number
  initialData: {
    mainImage: string
    title: string
    date: string
    location: string
    florists: string[]
    content: string
  }
}

function toDateInput(value: string): string {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function EditActivityContentForm({
  id,
  initialData,
}: EditActivityContentFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData.title || '')
  const [date, setDate] = useState(toDateInput(initialData.date))
  const [location, setLocation] = useState(initialData.location || '')
  const [florists, setFlorists] = useState(initialData.florists?.join(', ') || '')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState(initialData.content || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.mainImage || null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, ImageExtension],
    content: initialData.content || '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  const handleDrop = useCallback(
    async (e: DragEvent) => {
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
        if (!res.ok) {
          const errText = await res.text()
          console.error('이미지 업로드 실패:', res.status, errText)
          alert(`이미지 업로드 실패 (${res.status})`)
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
      }
    },
    [editor],
  )

  useEffect(() => {
    if (!editor) return
    const el = document.querySelector('.tiptap') as HTMLElement | null
    if (!el) return
    el.addEventListener('drop', handleDrop)
    return () => el.removeEventListener('drop', handleDrop)
  }, [editor, handleDrop])

  useEffect(() => {
    if (!imageFile) return
    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(imageFile)
  }, [imageFile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!window.confirm('수정하시겠습니까?')) return
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('date', date)
    formData.append('location', location)
    formData.append('florists', florists)
    formData.append('content', content)
    if (description) formData.append('description', description)
    if (imageFile) formData.append('image', imageFile)

    try {
      await updateActivityContent(id, formData)
      alert('수정되었습니다!')
      router.push(`/business/activities/${id}`)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert('수정 중 오류가 발생했습니다.')
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
              <Image src={previewUrl} alt="미리보기" fill className="object-cover" />
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
                      placeholder="갤러리 설명 (변경 시에만 입력)"
                      className="border rounded p-1 w-full"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

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
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#E34798] text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '수정 완료'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
