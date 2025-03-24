'use client'

import NewsTab from '@/components/tab/NewsTab'
import MainNewsCard from '@/components/card/MainNewsCard'
import DraggableCarousel from '@/components/carousel/DraggableCarousel'
import Loading from '@/components/common/Loading'
import { getNewsList } from '@/api/news'
import { NewsType, News } from '@/types/news'
import { useState, useEffect } from 'react'

const NewsList = () => {
  const [newsList, setNewsList] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNews = async (type: NewsType) => {
    setLoading(true)
    try {
      const data = await getNewsList(type)
      setNewsList(data)
    } catch (error) {
      setNewsList([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <NewsTab>
      {(activeTab) => {
        useEffect(() => {
          fetchNews(activeTab as NewsType)
        }, [activeTab])

        if (loading) {
          return <Loading />
        }

        return (
          <>
            {/* Desktop */}
            <ul className="grid-cols-3 gap-8 hidden sm:grid">
              {newsList.slice(0, 3).map((news) => (
                <li key={news.id}>
                  <MainNewsCard news={news} />
                </li>
              ))}
            </ul>

            {/* Mobile */}
            <DraggableCarousel className="block sm:hidden">
              {newsList.slice(0, 3).map((news) => (
                <MainNewsCard key={news.id} news={news} />
              ))}
            </DraggableCarousel>
          </>
        )
      }}
    </NewsTab>
  )
}

export default NewsList
