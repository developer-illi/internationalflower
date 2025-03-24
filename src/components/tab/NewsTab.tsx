'use client'

import { useState } from 'react'
import FadeInViewSection from '../motion/FadeInViewSection'
import { NEWS_TYPE, NewsType } from '@/types/news'

interface NewsTabProps {
  children: (activeTab: string) => React.ReactNode
}

const NewsTab = ({ children }: NewsTabProps) => {
  const [activeTab, setActiveTab] = useState<NewsType>('all')

  return (
    <div className="flex flex-col gap-y-6">
      <FadeInViewSection>
        <nav>
          <ul className="flex gap-x-4">
            {Object.entries(NEWS_TYPE).map(([type, label]) => (
              <li
                key={type}
                className={`text-base font-normal cursor-pointer transition-all duration-300 text-center w-max ${
                  activeTab === type ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setActiveTab(type as NewsType)}
              >
                {label}
              </li>
            ))}
          </ul>
        </nav>
      </FadeInViewSection>

      <FadeInViewSection>{children(activeTab)}</FadeInViewSection>
    </div>
  )
}

export default NewsTab
