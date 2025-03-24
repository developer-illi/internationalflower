'use client'

import HorizontalDivider from '@/components/common/HorizontalDivider'
import TitleWithContent from '@/components/common/TitleWithContent'
import LinkButton from '@/components/button/LinkButton'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Certification } from '@/types/business'

interface CertificationContentProps {
  data?: Certification
}

const CertificationContent = ({ data }: CertificationContentProps) => {
  if (!data) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`py-8 flex flex-col gap-y-10 md:gap-y-14`}
    >
      <TitleWithContent title={data.title} content={data.content} />
      <HorizontalDivider />
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4">
        <Image
          src={data.certification.image}
          alt={data.title}
          width={500}
          height={500}
          className="w-full h-auto"
        />
        <hgroup className="space-y-4">
          <h3 className="text-3xl font-semibold">자격정보</h3>
          <p>{data.certification.information}</p>
        </hgroup>
      </div>
      <LinkButton href={data.certification.hyperlink}>VIEW MORE</LinkButton>
    </motion.div>
  )
}

export default CertificationContent
