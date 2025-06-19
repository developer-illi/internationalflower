'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InternationalModal() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const resetForm = () => {
    setTitle('')
    setSubTitle('')
    setContent('')
    setImage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('subTitle', subTitle)
    formData.append('content', content)
    if (image) {
      formData.append('image', image)
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/overseasAdd`, {
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
          subTitle={subTitle}
          setSubTitle={setSubTitle}
          content={content}
          setContent={setContent}
          image={image}
          setImage={setImage}
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
  subTitle: string
  setSubTitle: (v: string) => void
  content: string
  setContent: (v: string) => void
  image: File | null
  setImage: (f: File | null) => void
  handleSubmit: (e: React.FormEvent) => void
}

function MyModal({
  onClose,
  title,
  setTitle,
  subTitle,
  setSubTitle,
  content,
  setContent,
  image,
  setImage,
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
        <h2 className="text-2xl font-semibold mb-4 text-center">국외행사 추가</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="서브타이틀을 입력하세요"
            className="border p-2 rounded"
            required
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            className="border p-2 rounded h-40 resize-none"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="border p-2 rounded file:bg-[#E34798] file:text-white file:px-4 file:py-2 file:rounded file:border-none"
          />

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