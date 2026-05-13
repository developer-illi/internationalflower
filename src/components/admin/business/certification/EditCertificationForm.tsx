'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCertification } from '@/api/business'

interface EditCertificationFormProps {
  id: number
  initialData: {
    title: string
    content: string
    headerImage: string | null
    certification: {
      image: string
      information: string
      hyperlink: string
    } | null
  }
}

export default function EditCertificationForm({
  id,
  initialData,
}: EditCertificationFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData.title || '')
  const [content, setContent] = useState(initialData.content || '')
  const [licenseInfo, setLicenseInfo] = useState(
    initialData.certification?.information || '',
  )
  const [link, setLink] = useState(initialData.certification?.hyperlink || '')
  const [headerImage, setHeaderImage] = useState<File | null>(null)
  const [subImage, setSubImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!window.confirm('수정하시겠습니까?')) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('licenseInfo', licenseInfo)
    formData.append('link', link)
    if (headerImage) formData.append('image', headerImage)
    if (subImage) formData.append('subImage', subImage)

    try {
      await updateCertification(id, formData)
      alert('수정되었습니다!')
      router.push('/business/certification')
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
          <h2 className="text-2xl font-bold">자격증 수정</h2>
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">설명</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-none"
          />
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">자격증 정보</label>
          <textarea
            value={licenseInfo}
            onChange={(e) => setLicenseInfo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-none"
          />
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">VIEW MORE 링크</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://..."
          />
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">대표 이미지 (헤더)</label>
          {initialData.headerImage && (
            <p className="text-xs text-gray-400 mb-2">현재: {initialData.headerImage}</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setHeaderImage(e.target.files?.[0] || null)}
          />
        </div>

        <div className="px-6 py-4 border-b">
          <label className="block text-sm text-gray-600 mb-2">자격증 이미지</label>
          {initialData.certification?.image && (
            <p className="text-xs text-gray-400 mb-2">
              현재: {initialData.certification.image}
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSubImage(e.target.files?.[0] || null)}
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
            className="px-4 py-2 bg-[#E34798] text-white rounded hover:bg-opacity-90"
          >
            수정 완료
          </button>
        </div>
      </form>
    </div>
  )
}
