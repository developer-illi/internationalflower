'use client'

import { MinusCircle } from 'lucide-react'
import Pagination from '@/components/pagination/Pagination'
import { PlusCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const PreviewCurrentPage = () => {
  const [totalPages, setTotalPages] = useState(10)
  const searchParams = useSearchParams()
  const currentPage = searchParams?.get('page') || '1'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value > 100) {
      setTotalPages(100)
    } else if (value < 1) {
      setTotalPages(1)
    } else {
      setTotalPages(value)
    }
  }

  const truncatedCurrentPage =
    currentPage.length > 10 ? `${currentPage.slice(0, 10)}...` : currentPage

  return (
    <section className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold mb-2 select-none">
        페이지 수를 설정해보세요.
      </h2>
      <section className="flex items-center gap-4">
        <MinusCircle
          className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-300"
          onClick={() => setTotalPages(Math.max(1, totalPages - 1))}
        />
        <input
          type="number"
          value={totalPages}
          onChange={handleInputChange}
          min={1}
          max={100}
          className="w-13 text-center text-3xl selection:bg-primary selection:text-background focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <PlusCircle
          className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-300"
          onClick={() => setTotalPages(Math.min(100, totalPages + 1))}
        />
      </section>
      <p className="text-sm text-center select-none -mb-16">
        현재 페이지는{' '}
        <span className="font-bold underline">
          {truncatedCurrentPage} 페이지
        </span>
        입니다.
        <br />
        <span className="text-foreground/50 italic">
          - 유효하지 않은 페이지는 1 페이지로 간주됩니다.
        </span>
        <br />
        <span className="text-foreground/50 italic">
          - 범위를 넘어간 페이지는 최대 페이지로 간주됩니다.
        </span>
      </p>
      <Pagination>
        {Array.from({ length: totalPages * 9 }, (_, index) => (
          <span key={index} className="hidden"></span>
        ))}
      </Pagination>
    </section>
  )
}

export default PreviewCurrentPage
