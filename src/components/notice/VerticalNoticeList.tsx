import FadeInViewSection from '@/components/motion/FadeInViewSection'
import NoticeCard from '@/components/card/NoticeCard'
import Empty from '@/components/common/Empty'
import { getNoticeList } from '@/api/notice'

interface VerticalNoticeListProps {
  className?: string
  searchKeyword?: string
}

const VerticalNoticeList = async ({
  className,
  searchKeyword,
}: VerticalNoticeListProps) => {
  const noticeList = await getNoticeList(searchKeyword).catch((_error) => {
    return []
  })

  if (noticeList.length === 0) {
    return (
      <FadeInViewSection>
        <Empty
          message={
            searchKeyword
              ? '검색 결과가 없습니다.'
              : '등록된 공지사항이 없습니다.'
          }
        />
      </FadeInViewSection>
    )
  }

  return (
    <ul className={`py-8 space-y-6 ${className}`}>
      {noticeList.map((item, index) => (
        <li key={`${item.id}-${index}`}>
          <FadeInViewSection delay={index * 0.2}>
            <NoticeCard notice={item} />
          </FadeInViewSection>
        </li>
      ))}
    </ul>
  )
}

export default VerticalNoticeList
