import { MetadataRoute } from 'next'
import { ifaMetadata } from '@/constants/metadata'
import { getActivity } from '@/api/business'
import { getNewsList } from '@/api/news'
import { getNoticeList } from '@/api/notice'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = ifaMetadata.siteUrl

  // 메인
  const mainRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ]

  // 협회소개
  const aboutRoutes = [
    {
      url: `${baseUrl}/about/greeting`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/history`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/organization`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/ci`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // 협회소식
  const newsRoutes = [
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // 주요사업
  const businessRoutes = [
    {
      url: `${baseUrl}/business/domestic`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business/international`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business/activities`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business/certification`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // 자료실
  const contentsRoutes = [
    {
      url: `${baseUrl}/contents/notice`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Contact
  const contactRoutes = [
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic Routes - 대외활동 상세
  const activities = await getActivity().catch(() => [])
  const activityDetailRoutes = activities.map((activity) => ({
    url: `${baseUrl}/business/activities/${activity.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic Routes - 뉴스 상세
  const newsList = await getNewsList('all').catch(() => [])
  const newsDetailRoutes = newsList.map((news) => ({
    url: `${baseUrl}/news/${news.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Dynamic Routes - 공지사항 상세
  const noticeList = await getNoticeList().catch(() => [])
  const noticeDetailRoutes = noticeList.map((notice) => ({
    url: `${baseUrl}/contents/notice/${notice.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...mainRoutes,
    ...aboutRoutes,
    ...newsRoutes,
    ...businessRoutes,
    ...contentsRoutes,
    ...contactRoutes,
    ...activityDetailRoutes,
    ...newsDetailRoutes,
    ...noticeDetailRoutes,
  ]
}
