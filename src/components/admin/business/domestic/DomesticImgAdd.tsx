'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface GalleryCardAddProps {
  id: number
  type: string
}

const DomesticImgAdd = ({ id, type }: GalleryCardAddProps) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const resetForm = () => {
    setTitle('')
    setContent('')
    setImageFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (imageFile) {
      formData.append('image', imageFile)
    }
    let res
    try {
      if (type === 'domestic') {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/domesticContentAdd/${id}`, {
          method: 'POST',
          body: formData,
        })
      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/internationalContentAdd/${id}`, {
          method: 'POST',
          body: formData,
        })
      }
      if (!res.ok) throw new Error('저장 실패')

      alert('저장되었습니다.')
      resetForm()
      setIsModalOpen(false)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert('저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <>
      <div className="group relative aspect-square overflow-hidden cursor-pointer bg-gray-100">
        <div
          className="absolute inset-0 z-10 p-10 w-full h-full bg-black/40 flex flex-col gap-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#E34798] text-white text-3xl flex items-center justify-center z-20"
          aria-label="Add"
        >
          +
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">이미지 추가</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요"
                className="border p-2 rounded"
                required
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력해주세요"
                className="border p-2 rounded h-40 resize-none"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="border p-2 rounded file:bg-[#E34798] file:text-white file:px-4 file:py-2 file:rounded file:border-none"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => {
                    resetForm()
                    setIsModalOpen(false)
                  }}
                >
                  닫기
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E34798] text-white rounded"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default DomesticImgAdd