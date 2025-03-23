import { Information } from '@/types/about'
import Image from 'next/image'

interface InformationSectionProps {
  information: Information
}

const InformationSection = ({ information }: InformationSectionProps) => {
  return (
    <article className="cursor-default min-h-screen w-full flex flex-col items-center gap-y-16">
      <Image
        src={'/images/logo.svg'}
        alt={information.title}
        width={72}
        height={72}
        className="self-center inline-block w-full h-auto aspect-square max-w-[200px] md:max-w-[222px]"
        priority
      />
      <p className="text-balance break-keep leading-loose">
        {information.information}
      </p>
      <table className="w-full break-keep">
        <tbody>
          {information.keywords.map((keyword) => (
            <tr key={keyword.keyword} className="">
              <td className="text-nowrap font-bold align-top pb-6 pr-4 min-w-fit">
                {keyword.keyword}
              </td>
              <td className="align-top pb-4">{keyword.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}

export default InformationSection
