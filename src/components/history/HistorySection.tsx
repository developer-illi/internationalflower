import { History } from '@/types/about'
import Title from '@/components/common/Title'
import Image from 'next/image'

interface HistorySectionProps {
  history: History
}

const HistorySection = ({ history }: HistorySectionProps) => {
  return (
    <section className="cursor-default flex flex-col gap-y-6">
      <Title title={history.title} />
      <table className="w-full break-keep">
        <tbody>
          {history.content.map((item, index) => (
            <tr key={`${item.date}-${index}`}>
              <td className="text-nowrap font-bold align-top pr-6 w-fit">
                {item.date}
              </td>
              <td className="align-top pb-6 w-full">
                <ul className="flex flex-col gap-y-5">
                  {item.events.map((event) => (
                    <li key={event.content} className="flex flex-col gap-y-5">
                      <p>{event.content}</p>
                      {event.image && (
                        <Image
                          src={event.image}
                          alt={event.content}
                          width={500}
                          height={500}
                          className="w-full h-auto max-h-[500px] object-cover pb-3"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default HistorySection
