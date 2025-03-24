import { MainProject } from '@/types/project'

export const MAIN_PROJECTS: MainProject[] = [
  {
    id: 1,
    title: '국내전시행사',
    subTitle: 'Domestic Exhibitions',
    href: '/business/domestic',
    image: '/images/main/domestic-exhibitions.png',
  },
  {
    id: 2,
    title: '국외전시행사',
    subTitle: 'International Exhibitions',
    href: '/business/international',
    image: '/images/main/international-exhibitions.png',
  },
  {
    id: 3,
    title: '자격증',
    subTitle: 'Certifications',
    href: '/business/certification',
    image: '/images/main/certifications.png',
  },
  {
    id: 4,
    title: '대외활동',
    subTitle: 'External Activities',
    href: '/business/activities',
    image: '/images/main/external-activities.png',
  },
]
