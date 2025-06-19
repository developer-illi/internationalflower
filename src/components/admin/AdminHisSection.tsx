'use client'

import { useState } from 'react'
import { History } from '@/types/about'
import Title from '@/components/common/Title'
import Image from 'next/image'

interface HistorySectionProps {
  history: History
}

const AdminHisSection = ({ history }: HistorySectionProps) => {
  const [localContents, setLocalContents] = useState(history.contents)
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [editedTexts, setEditedTexts] = useState<Record<string, string>>({})
  const [editedImages, setEditedImages] = useState<Record<string, File | null>>({})

  const handleEdit = (id: string, current: string) => {
    setEditingEventId(id)
    setEditedTexts((prev) => ({ ...prev, [id]: current }))
  }

  const handleImageChange = (id: string, file: File | null) => {
    setEditedImages((prev) => ({ ...prev, [id]: file }))
  }

  const handleSave = async (id: string) => {
    const newContent = editedTexts[id] || ''
    const imageFile = editedImages[id] || null

    const formData = new FormData()
    formData.append('content', newContent)
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/history_arter/${id}`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('수정 요청 실패')

      const data = await response.json()  // { id, content, img }

      const updated = localContents.map((item) => ({
        ...item,
        event: item.event.map((ev) =>
          String(ev.id) === String(data.id)
            ? { ...ev, content: data.content, img: data.img }
            : ev,
        ),
      }))
      setLocalContents(updated)

      setEditedTexts((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      setEditedImages((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      setEditingEventId(null)

      alert('수정되었습니다.')
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?')
    if (!confirmDelete) return  // 취소한 경우 함수 종료

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history_del/${id}`, {
        method: 'POST',
      })

      if (!response.ok) throw new Error('삭제 요청 실패')

      const updated = localContents.map((item) => ({
        ...item,
        event: item.event.filter((ev) => ev.id !== Number(id)),
      }))
      setLocalContents(updated)

      setEditedTexts((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      setEditedImages((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      setEditingEventId(null)

      alert('삭제되었습니다.')
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }

  return (
    <section className="cursor-default flex flex-col gap-y-6">
      <Title title={history.title} />
      <table className="w-full break-keep">
        <tbody>
        {localContents.map((item, index) => (
          <tr key={`${item.date}-${index}`}>
            <td className="text-nowrap font-bold align-top pr-6 w-fit">
              {item.date}
            </td>
            <td className="align-top pb-6 w-full">
              <ul className="flex flex-col gap-y-5">
                {item.event.map((event) => (
                  <li key={event.id} className="flex flex-col gap-y-3">
                    <div className="flex items-center gap-2">
                      {editingEventId === String(event.id) ? (
                        <>
                          <input
                            value={editedTexts[event.id] || ''}
                            onChange={(e) =>
                              setEditedTexts((prev) => ({
                                ...prev,
                                [event.id]: e.target.value,
                              }))
                            }
                            className="border px-2 py-1 rounded flex-1"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null
                              handleImageChange(String(event.id), file)
                            }}
                            className="text-sm"
                          />
                          <button
                            onClick={() => handleSave(String(event.id))}
                            className="text-blue-500 text-sm"
                          >
                            저장
                          </button>
                          <button
                            onClick={() => setEditingEventId(null)}
                            className="text-gray-500 text-sm"
                          >
                            취소
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="flex-1">{event.content}</p>
                          <button
                            onClick={() => handleEdit(String(event.id), event.content)}
                            className="text-green-600 text-sm"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDelete(String(event.id))}
                            className="text-red-500 text-sm"
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>

                    {event.img && (
                      <Image
                        src={event.img}
                        alt={event.content}
                        width={500}
                        height={500}
                        className="w-full h-auto max-h-[500px] object-cover pb-3"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </section>
  )
}

export default AdminHisSection
