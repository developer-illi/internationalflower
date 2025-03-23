import BaseModal from '@/components/modal/BaseModal'
import Question from '@/components/modal/Question'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteModal = ({ isOpen, onClose, onDelete }: DeleteModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} onConfirm={onDelete}>
      <Question
        question="삭제하시겠습니까?"
        description="내용이 영구적으로 삭제되며, 복구할 수 없습니다."
      />
    </BaseModal>
  )
}

export default DeleteModal
