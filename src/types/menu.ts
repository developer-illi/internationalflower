export interface SubMenuItem {
  title: string
  href: string
}

export interface MenuItem {
  title: string
  href: string
  subMenu: SubMenuItem[]
}
