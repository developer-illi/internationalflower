import FadeInViewSection from '@/components/motion/FadeInViewSection'
import NoticeCard from '@/components/card/NoticeCard'
import DraggableCarousel from '@/components/carousel/DraggableCarousel'
import { getNoticeList } from '@/api/notice'
import Empty from '@/components/common/Empty'

interface VerticalNoticeListProps {
  className?: string
}

const HorizontalNoticeList = async ({ className }: VerticalNoticeListProps) => {
  const noticeList = await getNoticeList().catch((_error) => {
    return []
  })

  return (
    <FadeInViewSection>
      {noticeList.length > 0 ? (
        <DraggableCarousel className={className}>
          {noticeList.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </DraggableCarousel>
      ) : (
        <Empty message="등록된 공지사항이 없습니다." />
      )}
    </FadeInViewSection>
  )
}

export default HorizontalNoticeList
