import React from 'react'
import BaseModal from './BaseModal'
import Information from './Information'

interface InformationModalProps {
  isOpen: boolean
  onClose: () => void
  information: string
}

const InformationModal = ({
  isOpen,
  onClose,
  information,
}: InformationModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Information information={information} />
    </BaseModal>
  )
}

export default InformationModal
