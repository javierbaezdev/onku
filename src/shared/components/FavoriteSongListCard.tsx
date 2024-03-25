import { twMerge } from 'tailwind-merge'
import { Marquee } from '.'
import { clsx } from 'clsx'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  cover: string
  name: string
  playListName: string
}

const FavoriteSongListCard = ({
  cover,
  name,
  playListName,
  className,
  ...rest
}: Props) => {
  return (
    <div
      className={twMerge(clsx('flex max-w-[320] flex-row gap-2 ', className))}
      {...rest}
    >
      <div className='min-w-[50px] '>
        <img
          className=' aspect-square rounded-md'
          width={50}
          height={50}
          src={cover}
          loading='lazy'
        />
      </div>
      <div className='flex flex-col gap-2 overflow-hidden'>
        <Marquee className='text-sm' classNameContainer=''>
          {name}
        </Marquee>
        <h4 className='line-clamp-1 text-xs text-cod-gray-400'>
          {playListName}
        </h4>
      </div>
    </div>
  )
}

export default FavoriteSongListCard
