'use client'

import { useRouter } from 'next/navigation'

interface TabBarProps {
  activeTab: string
  tabList: string[]
}

const TabBar = ({ activeTab, tabList }: TabBarProps) => {
  const router = useRouter()

  const handleTabClick = (tabId: string) => {
    router.push(`?tab=${tabId}`, { scroll: false })
  }

  return (
    <div className="w-full relative flex flex-wrap">
      {tabList.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`
            relative cursor-pointer flex-1 text-center py-3 md:py-2 px-6 text-sm sm:text-base font-medium text-nowrap
            transition-colors duration-300
            border-b border-border-tab
            before:absolute before:bottom-0 before:h-[2px] before:bg-primary before:content-['']
            before:transition-all before:duration-300 before:ease-out
            hover:text-primary 
            ${
              activeTab === tab
                ? 'text-primary before:left-0 before:right-0'
                : 'text-foreground before:left-1/2 before:right-1/2'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default TabBar
