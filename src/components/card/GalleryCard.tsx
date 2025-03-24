import Image from 'next/image'

interface GalleryCardProps {
  image: string
  title: string
  date: string
  onClick: () => void
}

const GalleryCard = ({ image, title, date, onClick }: GalleryCardProps) => {
  return (
    <div
      className="group relative aspect-square overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 z-10 p-10 w-full h-full bg-black/40 flex flex-col gap-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-2xl font-semibold">{title}</p>
        <p className="text-white text-lg font-normal">{date}</p>
      </div>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  )
}

export default GalleryCard
