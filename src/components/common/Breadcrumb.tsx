import ArrowLeft from '@/assets/arrow-left.svg'
import Home from '@/assets/home.svg'

interface BreadcrumbProps {
  path: string[]
}

const Breadcrumb = ({ path }: BreadcrumbProps) => {
  return (
    <ul className="flex cursor-default select-none items-center gap-3">
      <li>
        <Home className="w-5 h-auto" />
      </li>
      {path.map((p, i) => {
        return (
          <li
            key={p}
            className="flex items-center gap-3 text-foreground text-sm align-baseline font-medium"
          >
            <ArrowLeft className="w-6 h-auto rotate-180" />
            <span>{p}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default Breadcrumb
