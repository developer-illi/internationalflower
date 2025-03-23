'use client'

import { usePagination } from '@/hooks/usePagination'
import ArrowRight from '@/assets/arrow-right.svg'

interface PaginationProps {
  children: React.ReactNode[]
}

const Pagination: React.FC<PaginationProps> = ({ children }) => {
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
      {/* Pagination Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-3 gap-4">
        {paginatedItems[currentPage - 1]?.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>

      {/* Pagination */}
      {children.length >= 9 && (
        <div className="flex items-center justify-center space-x-2 select-none">
          {/* Prev Button */}
          <button
            onClick={goToPrevPageGroup}
            disabled={currentPage <= 1}
            className="group px-3 py-1 cursor-pointer disabled:cursor-default disabled:hover:text-foreground hover:text-primary disabled:opacity-30"
          >
            <ArrowRight className="rotate-180 stroke-foreground group-disabled:group-hover:stroke-foreground group-hover:stroke-primary" />
          </button>

          {/* Page Numbers */}
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

          {/* Next Button */}
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
