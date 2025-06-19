'use client'

import React, { useState, useCallback } from 'react'

interface HistoryContentProps {
  id: number
}

export default function History_content({ id }: HistoryContentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('text', text)
      formData.append('month', month)
      if (image) {
        formData.append('image', image)
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history_event_add/${id}`, {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        alert('등록 완료!')
        setIsOpen(false)
        setText('')
        setYear('')
        setMonth('')
        setImage(null)
      } else {
        alert('등록 실패')
      }
    },
    [id, text, month, image]
  )

  return (
    <div className="hidden md:flex flex-row md:pt-5 pl-10">
      <button
        className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center text-2xl shadow"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>
      {isOpen && (
        <MyModal
          onClose={() => setIsOpen(false)}
          text={text}
          setText={setText}
          month={month}
          setMonth={setMonth}
          image={image}
          setImage={setImage}
          handleSubmit={handleSubmit}
          months={months}
        />
      )}
    </div>
  )
}

interface MyModalProps {
  onClose: () => void
  text: string
  setText: (v: string) => void
  month: string
  setMonth: (v: string) => void
  image: File | null
  setImage: (f: File | null) => void
  handleSubmit: (e: React.FormEvent) => void
  months: number[]
}

function MyModal({
  onClose,
  text,
  setText,
  month,
  setMonth,
  image,
  setImage,
  handleSubmit,
  months,
}: MyModalProps) {
  const [isComposing, setIsComposing] = useState(false)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">연혁 추가</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">월 선택</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </select>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={(e) => {
              setIsComposing(false)
              setText(e.currentTarget.value)
            }}
            placeholder="내용 입력"
            className="border p-2 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={onClose}
            >
              닫기
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}