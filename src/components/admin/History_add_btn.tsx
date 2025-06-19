'use client'

import { useState } from 'react'

export default function History_modal() {
  const [isOpen, setIsOpen] = useState(false)
  const [year, setYear] = useState('')

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('year', year)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history_add`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      alert('등록 완료!')
      setIsOpen(false)
      setYear('')
    } else {
      alert('등록 실패')
    }
  }

  function MyModal({ onClose }: { onClose: () => void }) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">연혁 추가</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border p-2 rounded"
              required
            >
              <option value="">연도 선택</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </select>
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
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="hidden md:flex justify-center md:pt-5">
      <button
        className="w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl shadow transition"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>

      {isOpen && <MyModal onClose={() => setIsOpen(false)} />}
    </div>
  )
}