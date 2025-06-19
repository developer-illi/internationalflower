'use client'

import HorizontalDivider from '@/components/common/HorizontalDivider'
import TitleWithContent from '@/components/common/TitleWithContent'
import GalleryCard from '@/components/card/GalleryCard'
import Pagination from '@/components/pagination/Pagination'
import { Activity } from '@/types/business'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface ActivitiesPaginationProps {
  data: Activity
  isLoggedIn: boolean
}

const ActivitiesPagination = ({ data, isLoggedIn }: ActivitiesPaginationProps) => {
  const router = useRouter()
  const AddCard = () => (
    <div
      className="group relative aspect-square overflow-hidden cursor-pointer bg-gray-100"
      onClick={() => router.push(`/business/activities/write?id=${data.id}`)}
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="py-8 flex flex-col gap-y-10 md:gap-y-14"
    >
      <TitleWithContent title={data.title} content={data.content} />
      <HorizontalDivider />
      <Pagination fixedTop={isLoggedIn ? <AddCard /> : undefined}>
        {data.galleryList.map((item) => (
          <Link key={item.id} href={`/business/activities/${item.id}`}>
            <GalleryCard
              image={item.image}
              title={item.title}
              date={item.date}
              onClick={() => {}}
            />
          </Link>
        ))}
      </Pagination>
    </motion.div>
  )
}

export default ActivitiesPagination