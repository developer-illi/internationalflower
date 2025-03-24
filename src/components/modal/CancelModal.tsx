import BaseModal from '@/components/modal/BaseModal'
import Question from '@/components/modal/Question'

interface CancelModalProps {
  isOpen: boolean
  onClose: () => void
  onCancel: () => void
}

const CancelModal = ({ isOpen, onClose, onCancel }: CancelModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} onConfirm={onCancel}>
      <Question
        question="취소하시겠습니까?"
        description="수정한 내용은 초기화되며, 변경 전으로 돌아갑니다."
      />
    </BaseModal>
  )
}

export default CancelModal
