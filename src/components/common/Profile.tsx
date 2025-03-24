import Image from 'next/image'
import { Profile as ProfileType } from '@/types/about'

const Profile = ({ name, position, image, description }: ProfileType) => {
  const isPresident = ['이사장', '부이사장'].includes(position)

  const generateName = (name: string) => {
    if (isPresident) {
      return name.split('').join('  ')
    }
    return name.split('').join(name.length === 3 ? ' ' : '    ')
  }

  const imageStyles = isPresident
    ? 'w-16 sm:w-28 lg:w-36 xl:w-40'
    : 'w-16 sm:w-24 xl:w-28'

  const textStyles = isPresident
    ? 'text-xs sm:text-sm md:text-base'
    : 'text-xs sm:text-sm'

  return (
    <article className="w-full lg:w-fit h-fit flex items-end gap-x-3 gap-y-4 text-nowrap">
      <div
        className={`h-auto aspect-[3/4] relative overflow-hidden ${imageStyles}`}
      >
        <Image
          src={image}
          alt={`${name} ${position}님의 프로필 사진`}
          fill
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col gap-1 lg:gap-4 h-full text-left items-start">
        <header>
          <div
            className={`flex items-center gap-4 font-medium ${textStyles}`}
            id={`profile-${name}`}
          >
            <span>{position}</span>
            <span className="font-semibold whitespace-pre">
              {generateName(name)}
            </span>
          </div>
        </header>

        <ul className="list-none space-y-1">
          {description.map((desc, index) => (
            <li
              key={index}
              className={`min-h-[1.5em] leading-[1.5] ${textStyles}`}
            >
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default Profile
