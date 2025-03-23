'use client'

import Image from 'next/image'
import Checked from '@/assets/checkbox-checked.svg'
import Unchecked from '@/assets/checkbox-unchecked.svg'

interface CheckboxProps {
  isChecked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  className?: string
}

const Checkbox = ({
  isChecked,
  onChange,
  disabled = false,
  label,
  className = '',
}: CheckboxProps) => {
  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div className="relative w-5 h-5">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        {isChecked ? <Checked /> : <Unchecked />}
      </div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  )
}

export default Checkbox
