import { FC, SVGProps, SVGSVGElement } from 'react'

declare global {
  module '*.svg' {
    const component: FC<SVGProps<SVGSVGElement> & { className?: string }>
    export default component
  }
}
