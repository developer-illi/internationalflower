'use client'

import { useRouter } from 'next/navigation'

export default function NoticeWritePostButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/contents/notice/write')}
      className="fixed bottom-6 right-6 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg"
    >
      글쓰기
    </button>
  )
}