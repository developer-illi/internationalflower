import { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface UsePaginationProps {
  items: React.ReactNode[]
  itemsPerPage?: number
  groupSize?: number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  pageNumbers: number[]
  paginatedItems: React.ReactNode[][]
  handlePageChange: (page: number) => void
  goToPrevPageGroup: () => void
  goToNextPageGroup: () => void
}

export const usePagination = ({
  items,
  itemsPerPage = 9,
  groupSize = 5,
}: UsePaginationProps): UsePaginationReturn => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const paginatedItems = useMemo(() => {
    const chunks: React.ReactNode[][] = []
    for (let i = 0; i < items.length; i += itemsPerPage) {
      chunks.push(items.slice(i, i + itemsPerPage))
    }
    return chunks
  }, [items, itemsPerPage])

  const totalPages = paginatedItems.length
  const currentPage = Math.min(
    Math.max(Number(searchParams?.get('page')) || 1, 1),
    totalPages || 1,
  )

  const currentGroupIndex = Math.floor((currentPage - 1) / groupSize)
  const currentGroupStart = currentGroupIndex * groupSize + 1
  const currentGroupEnd = Math.min(
    currentGroupStart + groupSize - 1,
    totalPages,
  )

  const pageNumbers = useMemo(() => {
    return Array.from(
      { length: currentGroupEnd - currentGroupStart + 1 },
      (_, index) => currentGroupStart + index,
    )
  }, [currentGroupStart, currentGroupEnd])

  const handlePageChange = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), totalPages || 1)
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    params.set('page', safePage.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const goToPrevPageGroup = () => {
    if (currentPage === currentGroupStart) {
      const prevGroupEnd = Math.max(currentGroupStart - 1, 1)
      handlePageChange(prevGroupEnd)
    } else {
      handlePageChange(currentGroupStart)
    }
  }

  const goToNextPageGroup = () => {
    if (currentPage === currentGroupEnd) {
      const nextGroupStart = Math.min(currentGroupEnd + 1, totalPages)
      handlePageChange(nextGroupStart)
    } else {
      handlePageChange(currentGroupEnd)
    }
  }

  return {
    currentPage,
    totalPages,
    pageNumbers,
    paginatedItems,
    handlePageChange,
    goToPrevPageGroup,
    goToNextPageGroup,
  }
}
