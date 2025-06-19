'use client'

import { usePagination } from '@/hooks/usePagination'
import ArrowRight from '@/assets/arrow-right.svg'

interface PaginationProps {
  children: React.ReactNode[]
  fixedTop?: React.ReactNode
}

const Pagination: React.FC<PaginationProps> = ({ children, fixedTop }) => {
  const {
    currentPage,
    totalPages,
    pageNumbers,
    paginatedItems,
    handlePageChange,
    goToPrevPageGroup,
    goToNextPageGroup,
  } = usePagination({
    items: children,
  })

  return (
    <section className="flex flex-col justify-center gap-y-10">
      {/* Grid with fixedTop inside */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fixedTop && (
          <div className="min-h-[100px]">{fixedTop}</div>
        )}
        {paginatedItems[currentPage - 1]?.map((child, index) => (
          <div key={index} className="min-h-[100px]">
            {child}
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {children.length >= 9 && (
        <div className="flex items-center justify-center space-x-2 select-none">
          <button
            onClick={goToPrevPageGroup}
            disabled={currentPage <= 1}
            className="group px-3 py-1 cursor-pointer disabled:cursor-default disabled:hover:text-foreground hover:text-primary disabled:opacity-30"
          >
            <ArrowRight className="rotate-180 stroke-foreground group-disabled:group-hover:stroke-foreground group-hover:stroke-primary" />
          </button>

          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-1 rounded-full text-base font-semibold cursor-pointer ${
                currentPage === pageNumber
                  ? 'bg-primary text-background'
                  : 'bg-transparent text-foreground hover:text-primary'
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={goToNextPageGroup}
            disabled={currentPage >= totalPages}
            className="group px-3 py-1 cursor-pointer disabled:cursor-default disabled:opacity-30"
          >
            <ArrowRight className="stroke-foreground group-disabled:group-hover:stroke-foreground group-hover:stroke-primary" />
          </button>
        </div>
      )}
    </section>
  )
}

export default Pagination