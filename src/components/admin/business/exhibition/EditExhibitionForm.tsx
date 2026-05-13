'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateDomestic, updateOverseas } from '@/api/business'

interface EditExhibitionFormProps {
  id: number
  type: 'domestic' | 'international'
  initialData: {
    title: string
    subTitle: string
    content: string
    headerImage: string | null
  }
}

export default function EditExhibitionForm({
  id,
  type,
  initialData,
}: EditExhibitionFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData.title || '')
  const [subTitle, setSubTitle] = useState(initialData.subTitle || '')
  const [content, setContent] = useState(initialData.content || '')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!window.confirm('수정하시겠습니까?')) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('subTitle', subTitle)
    formData.append('content', content)
    if (selectedImage) formData.append('image', selectedImage)

    try {
      if (type === 'domestic') {
        await updateDomestic(id, formData)
      } else {
        await updateOverseas(id, formData)
      }
      alert('수정되었습니다!')
      router.push(`/business/${type}`)
      router.refresh()
    } catch {
      alert('수정 중 오류가 발생했습니다.')
    }
  }

  const sectionLabel = type === 'domestic' ? '국내전시' : '국외전시'

  return (
    <div className="min-h-screen bg-white px-6 pt-28 pb-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto border border-gray-200 bg-white rounded"
      >
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-bold">{sectionLabel} 수정</h2>
        </div>

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

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">서브타이틀</label>
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-40 resize-none focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="px-6 pt-6 border-b pb-4">
          <label className="block text-sm text-gray-600 mb-2">대표 이미지 교체</label>
          {initialData.headerImage && (
            <p className="text-xs text-gray-400 mb-2">현재 이미지: {initialData.headerImage}</p>
          )}
          <label
            htmlFor="exh-image-upload"
            className="cursor-pointer inline-block px-4 py-2 bg-[#E34798] text-white rounded hover:bg-opacity-90 text-sm"
          >
            이미지 선택
          </label>
          <input
            id="exh-image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
            className="hidden"
          />
          {selectedImage && (
            <p className="text-sm text-gray-500 mt-2">선택된 파일: {selectedImage.name}</p>
          )}
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
