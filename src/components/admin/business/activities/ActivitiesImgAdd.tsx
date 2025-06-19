'use client'

import { useRouter } from 'next/navigation'

interface GalleryCardAddProps {
  id: number
}

const ActivitiesImgAdd = ({ id }: GalleryCardAddProps) => {
  const router = useRouter()

  return (
    <div
      className="group relative aspect-square overflow-hidden cursor-pointer bg-gray-100"
      onClick={() => router.push(`/activities/add/${id}`)}
    >
      <div className="absolute inset-0 z-10 p-10 w-full h-full bg-black/40 flex flex-col gap-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div
        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#E34798] text-white text-3xl flex items-center justify-center z-20"
        aria-label="Add"
      >
        +
      </div>
    </div>
  )
}

export default ActivitiesImgAdd