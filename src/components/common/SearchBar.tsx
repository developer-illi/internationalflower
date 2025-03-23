'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Close from '@/assets/close.svg'
import Search from '@/assets/search.svg'

interface SearchBarProps {
  className?: string
}

const SearchBar = ({ className }: SearchBarProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(
    searchParams?.get('search') ?? '',
  )

  const handleSearch = () => {
    const query = searchValue.trim()
    if (!query) return

    const params = new URLSearchParams(searchParams?.toString() ?? '')
    params.set('search', query)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleClear = () => {
    setSearchValue('')
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    params.delete('search')
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div
      className={`relative flex items-center gap-x-2 border-b py-2 border-border group ${className}`}
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Searching"
        className="peer flex-1 bg-transparent placeholder:text-foreground/50 focus:outline-none"
      />
      <button
        onClick={handleClear}
        className={`cursor-pointer bg-[#E5E5E5] rounded-full p-1.5 opacity-0 hover:opacity-100 group-hover:opacity-80 peer-focus:opacity-80 transition-opacity ${
          searchValue ? 'visible' : 'invisible'
        }`}
      >
        <Close className="w-full h-full fill-foreground" />
      </button>
      <button onClick={handleSearch} className="cursor-pointer p-1">
        <Search className="w-full h-full" />
      </button>
    </div>
  )
}

export default SearchBar
