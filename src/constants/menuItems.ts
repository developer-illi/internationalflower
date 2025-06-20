import { MenuItem } from '@/types/menu'

export const menuItems: MenuItem[] = [
  {
    title: '협회소개',
    href: '/about/greeting',
    subMenu: [
      { title: '인사말', href: '/about/greeting' },
      { title: '연혁', href: '/about/history' },
      // { title: '조직도', href: '/about/organization' },
    ],
  },
  {
    title: '협회소식',
    href: '/news',
    subMenu: [
      { title: '보도자료', href: '/news?type=report' },
      { title: '최근이슈', href: '/news?type=issues' },
    ],
  },
  {
    title: '주요사업',
    href: '/business/domestic',
    subMenu: [
      { title: '국내전시행사', href: '/business/domestic' },
      { title: '국외전시행사', href: '/business/international' },
      { title: '자격증', href: '/business/certification' },
      { title: '대외활동', href: '/business/activities' },
    ],
  },
  {
    title: '자료실',
    href: '/contents/notice',
    subMenu: [{ title: '공지사항', href: '/contents/notice' }],
  },
  {
    title: 'CONTACT',
    href: '/contact',
    subMenu: [],
  },
]
