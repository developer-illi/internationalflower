'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LicenseAddModal() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)

  // 추가된 항목
  const [licenseInfo, setLicenseInfo] = useState('')
  const [link, setLink] = useState('')
  const [subImage, setSubImage] = useState<File | null>(null)

  const resetForm = () => {
    setTitle('')
    setContent('')
    setImage(null)
    setLicenseInfo('')
    setLink('')
    setSubImage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('licenseInfo', licenseInfo)
    formData.append('link', link)
    if (image) {
      formData.append('image', image)
    }
    if (subImage) {
      formData.append('subImage', subImage)
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/licenseAdd`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      alert('등록 완료!')
      resetForm()
      setIsOpen(false)
      router.refresh()
    } else {
      alert('등록 실패')
    }
  }

  return (
    <div className="hidden md:flex justify-center md:pt-5">
      <button
        className="w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl shadow"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>

      {isOpen && (
        <MyModal
          onClose={() => {
            resetForm()
            setIsOpen(false)
          }}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          image={image}
          setImage={setImage}
          licenseInfo={licenseInfo}
          setLicenseInfo={setLicenseInfo}
          link={link}
          setLink={setLink}
          subImage={subImage}
          setSubImage={setSubImage}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

interface MyModalProps {
  onClose: () => void
  title: string
  setTitle: (v: string) => void
  content: string
  setContent: (v: string) => void
  image: File | null
  setImage: (f: File | null) => void
  licenseInfo: string
  setLicenseInfo: (v: string) => void
  link: string
  setLink: (v: string) => void
  subImage: File | null
  setSubImage: (f: File | null) => void
  handleSubmit: (e: React.FormEvent) => void
}

function MyModal({
  onClose,
  title,
  setTitle,
  content,
  setContent,
  image,
  setImage,
  licenseInfo,
  setLicenseInfo,
  link,
  setLink,
  subImage,
  setSubImage,
  handleSubmit,
}: MyModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">자격증 추가</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="자격증 제목을 입력하세요"
            className="border p-2 rounded"
            required
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="자격증 내용(요약)을 입력하세요"
            className="border p-2 rounded h-32 resize-none"
            required
          />

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">메인 이미지</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="border p-2 rounded file:bg-[#E34798] file:text-white file:px-4 file:py-2 file:rounded file:border-none"
            />
          </div>

          <textarea
            value={licenseInfo}
            onChange={(e) => setLicenseInfo(e.target.value)}
            placeholder="자격증에 대한 추가 설명을 입력하세요"
            className="border p-2 rounded h-28 resize-none"
          />

          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="자격증 관련 링크 (선택)"
            className="border p-2 rounded"
          />

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-700">자격증 보조 이미지</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSubImage(e.target.files?.[0] || null)}
              className="border p-2 rounded file:bg-[#E34798] file:text-white file:px-4 file:py-2 file:rounded file:border-none"
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              닫기
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: '#e34798' }}
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}