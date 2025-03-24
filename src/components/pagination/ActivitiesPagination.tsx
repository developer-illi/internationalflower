'use client'

import HorizontalDivider from '@/components/common/HorizontalDivider'
import TitleWithContent from '@/components/common/TitleWithContent'
import GalleryCard from '@/components/card/GalleryCard'
import Pagination from '@/components/pagination/Pagination'
import { Activity } from '@/types/business'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ActivitiesPaginationProps {
  data: Activity
}

const ActivitiesPagination = ({ data }: ActivitiesPaginationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="py-8 flex flex-col gap-y-10 md:gap-y-14"
    >
      <TitleWithContent title={data.title} content={data.content} />
      <HorizontalDivider />
      <Pagination>
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
