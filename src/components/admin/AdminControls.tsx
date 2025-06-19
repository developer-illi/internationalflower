'use client'

export default function AdminControls() {
  const handleAdd = () => {
    console.log('추가하기 클릭')
    // 추가 기능 구현
  }

  const handleEdit = () => {
    console.log('수정하기 클릭')
    // 수정 기능 구현
  }

  return (
    <div className="flex space-x-2 mt-4">
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        추가하기
      </button>
      <button
        onClick={handleEdit}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        수정하기
      </button>
    </div>
  )
}