'use client'

import DOMPurify from 'dompurify'

interface HTMLContentProps {
  html: string
  className?: string
}

const HTMLContent = ({ html, className }: HTMLContentProps) => {
  const safeHTML = DOMPurify.sanitize(html)

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: safeHTML }} />
  )
}

export default HTMLContent
