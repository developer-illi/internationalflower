'use client'

import OutlinedButton from '@/components/button/OutlinedButton'
import DeleteModal from '@/components/modal/DeleteModal'
import CancelModal from '@/components/modal/CancelModal'
import { useState } from 'react'
import InformationModal from '@/components/modal/InformationModal'
import LinkButton from '@/components/button/LinkButton'

const ModalPreview = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false)

  const handleDelete = () => {
    setIsDeleteModalOpen(false)
    alert('삭제를 선택했습니다.')
  }

  const handleCancel = () => {
    setIsCancelModalOpen(false)
    alert('취소를 선택했습니다.')
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center cursor-default">
      <h1 className="text-2xl font-bold mb-2">Modal Preview</h1>
      <OutlinedButton onClick={() => setIsDeleteModalOpen(true)}>
        Delete
      </OutlinedButton>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />

      <OutlinedButton onClick={() => setIsCancelModalOpen(true)}>
        Cancel
      </OutlinedButton>
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onCancel={handleCancel}
      />

      <OutlinedButton onClick={() => setIsInformationModalOpen(true)}>
        Information
      </OutlinedButton>
      <InformationModal
        isOpen={isInformationModalOpen}
        onClose={() => setIsInformationModalOpen(false)}
        information="저장되었습니다!"
      />

      <LinkButton href="/resources" className="mt-4">
        이전으로
      </LinkButton>
    </div>
  )
}

export default ModalPreview
