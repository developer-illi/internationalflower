'use client'

import HorizontalDivider from '@/components/common/HorizontalDivider'
import TitleWithContent from '@/components/common/TitleWithContent'
import Pagination from '@/components/pagination/Pagination'
import GalleryModal from '@/components/modal/GalleryModal'
import ControllableCarousel from '@/components/carousel/ControllableCarousel'
import DraggableCarousel from '@/components/carousel/DraggableCarousel'
import DomesticImgAdd from '@/components/admin/business/domestic/DomesticImgAdd'
import GalleryCard from '@/components/card/GalleryCard'
import DeleteExhibitionButton from '@/components/admin/business/exhibition/DeleteExhibitionButton'
import DeleteExhibitionContentButton from '@/components/admin/business/exhibition/DeleteExhibitionContentButton'
import { Exhibition, GalleryItem } from '@/types/business'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ExhibitionsPaginationProps {
  data: Exhibition
  isLoggedIn: boolean
  type: string
}

const ExhibitionsPagination = ({ data, isLoggedIn, type }: ExhibitionsPaginationProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const handleCardClick = (item: GalleryItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const exhibitionType = type === 'domestic' ? 'domestic' : 'international'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-8 flex flex-col gap-y-10 md:gap-y-14"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <TitleWithContent
            title={data.title}
            subTitle={data.subTitle}
            content={data.content}
          />
          {isLoggedIn && (
            <div className="flex gap-2 shrink-0">
              <Link
                href={`/business/${exhibitionType}/edit/${data.id}`}
                className="px-3 py-1.5 text-sm bg-[#E34798] text-white rounded hover:bg-opacity-90"
              >
                탭 수정
              </Link>
              <DeleteExhibitionButton
                id={data.id}
                type={exhibitionType}
                childCount={data.galleryList.length}
              />
            </div>
          )}
        </div>
        <HorizontalDivider />

        {/* Desktop Carousel */}
        <ControllableCarousel
          imageUrls={data.mainImageList}
          className="w-full hidden md:flex"
        />
        {/* Mobile Carousel */}
        <DraggableCarousel className="block md:hidden">
          {data.mainImageList.map((url) => {
            const validSrc = url.startsWith('http') ? url : `/media/${url.replace(/^\/+/, '')}`
            return (
              <Image
                key={validSrc}
                src={validSrc}
                alt=""
                width={500}
                height={500}
                className="object-cover w-full h-auto aspect-video"
              />
            )
          })}
        </DraggableCarousel>
        <Pagination fixedTop={isLoggedIn ? <DomesticImgAdd id={data.id} type={type} /> : undefined}>
          {data.galleryList.map((item) => (
            <div key={item.id} className="relative group">
              <GalleryCard
                image={item.image}
                title={item.title}
                date={item.date}
                onClick={() => handleCardClick(item)}
              />
              {isLoggedIn && (
                <DeleteExhibitionContentButton
                  contentId={item.id}
                  type={exhibitionType}
                />
              )}
            </div>
          ))}
        </Pagination>
      </motion.div>
      {selectedItem && (
        <GalleryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={selectedItem}
        />
      )}
    </>
  )
}

export default ExhibitionsPagination
