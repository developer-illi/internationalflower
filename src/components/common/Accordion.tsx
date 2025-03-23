import { useState } from 'react'
import ArrowRight from '@/assets/arrow-right.svg'

interface AccordionProps {
  title: string
  children: React.ReactNode
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <button
        className="w-full flex justify-between items-center text-xl cursor-pointer font-semibold text-foreground hover:text-primary"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <div
          className={`transition-all ease-in-out duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <ArrowRight className="rotate-90 stroke-foreground" />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Accordion
