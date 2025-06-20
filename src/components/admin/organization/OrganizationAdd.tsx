'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Organization_modal() {
  const [isOpen, setIsOpen] = useState(false)

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

function MyModal({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [position, setPosition] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [careerInputs, setCareerInputs] = useState<string[]>([''])

  const positions = ['이사장', '부이사장', '이사', '감사']

  function addCareerInput() {
    setCareerInputs([...careerInputs, ''])
  }

  function handleCareerChange(index: number, value: string) {
    const newCareers = [...careerInputs]
    newCareers[index] = value
    setCareerInputs(newCareers)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('position', position)
    formData.append('name', name)
    if (image) formData.append('image', image)
    careerInputs.forEach((career, index) => {
      formData.append(`career_${index + 1}`, career)
    })

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organization_add`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      alert('등록 완료!')
      onClose() // 부모에서 모달 닫기
      router.refresh()
    } else {
      alert('등록 실패')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">임원 추가</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 직급 선택 */}
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">직급</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>

          {/* 이름 입력 */}
          <input
            type="text"
            placeholder="이름"
            className="border p-2 rounded"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* 파일 업로드 */}
          <div>
            <label className="block font-medium">사진 업로드</label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0])
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="inline-block mt-2 bg-[#E34798] text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600 transition"
            >
              파일 선택
            </label>
            <span className="ml-2 text-sm text-gray-700">
              {image ? image.name : '선택된 파일 없음'}
            </span>

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="미리보기"
                className="mt-3 w-32 h-32 object-cover rounded border"
              />
            )}
          </div>

          {/* 주요 경력 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">주요 경력</label>
            {careerInputs.map((career, index) => (
              <input
                key={index}
                type="text"
                value={career}
                onChange={(e) => handleCareerChange(index, e.target.value)}
                placeholder={`경력 ${index + 1}`}
                className="border p-2 rounded"
                required
              />
            ))}
            <button
              type="button"
              onClick={addCareerInput}
              className="text-blue-500 hover:underline self-start text-sm"
            >
              + 경력 추가
            </button>
          </div>

          {/* 버튼 */}
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
              className="px-4 py-2 bg-[#E34798] hover:bg-pink-600 text-white rounded"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}