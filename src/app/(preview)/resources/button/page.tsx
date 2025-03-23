'use client'

import { useState } from 'react'
import Checkbox from '@/components/button/Checkbox'
import FilledButton from '@/components/button/FilledButton'
import OutlinedButton from '@/components/button/OutlinedButton'
import IconButton from '@/components/button/IconButton'
import LinkButton from '@/components/button/LinkButton'
import Calendar from '@/assets/calendar.svg'
import Plus from '@/assets/plus.svg'
import Close from '@/assets/close.svg'

const ButtonPreview = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    )
  }

  const handleClickButton = (message: string) => {
    alert(message)
  }

  return (
    <div className="h-screen w-screen overflow-y-scroll flex flex-col gap-4 items-center justify-center cursor-default">
      <h1 className="text-2xl font-bold mb-2">Button Preview</h1>

      <section>
        <h2 className="text-center text-lg mb-6 underline underline-offset-4">
          Default Button
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <OutlinedButton onClick={() => handleClickButton('Cancel Clicked')}>
            Cancel
          </OutlinedButton>
          <FilledButton onClick={() => handleClickButton('Save Clicked')}>
            Save
          </FilledButton>
          <FilledButton onClick={() => handleClickButton('image Clicked')}>
            image
          </FilledButton>
          <OutlinedButton onClick={() => handleClickButton('Delete Clicked')}>
            Delete
          </OutlinedButton>
          <FilledButton onClick={() => handleClickButton('글쓰기 Clicked')}>
            글쓰기
          </FilledButton>
          <FilledButton onClick={() => handleClickButton('바로가기 Clicked')}>
            바로가기
          </FilledButton>
        </div>
      </section>

      <section>
        <h2 className="text-center text-lg my-6 underline underline-offset-4">
          Checkbox Button
        </h2>

        <div className="grid grid-cols-3 gap-x-6 gap-y-3 mx-auto">
          <Checkbox
            isChecked={selectedOptions.includes('옵션 1')}
            onChange={() => handleCheckboxChange('옵션 1')}
            label="옵션 1"
          />
          <Checkbox
            isChecked={selectedOptions.includes('옵션 2')}
            onChange={() => handleCheckboxChange('옵션 2')}
            label="옵션 2"
          />
          <Checkbox
            isChecked={selectedOptions.includes('옵션 3')}
            onChange={() => handleCheckboxChange('옵션 3')}
            label="옵션 3"
          />

          <p className="col-span-3 text-sm">
            선택한 옵션:{' '}
            <span className="font-bold">{selectedOptions.join(', ')}</span>
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-center text-lg mb-6 underline underline-offset-4">
          Icon Button
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <IconButton
            src="/icons/calendar.svg"
            alt="calendar"
            onClick={() => handleClickButton('calendar Clicked')}
          />
          <IconButton
            src="/icons/circle-plus.svg"
            alt="plus"
            onClick={() => handleClickButton('plus Clicked')}
          />
          <IconButton
            src="/icons/circle-close.svg"
            alt="close"
            onClick={() => handleClickButton('close Clicked')}
          />
        </div>
      </section>

      <LinkButton href="/resources" className="mt-4">
        이전으로
      </LinkButton>
    </div>
  )
}

export default ButtonPreview
