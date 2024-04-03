import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import { Image, Marquee } from '@/shared/components'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  cover: string
  name: string
  playListName: string
  classNameMarquee?: string
}

const SongCard = ({
  cover,
  name,
  playListName,
  className,
  classNameMarquee,
  ...rest
}: Props) => {
  return (
    <div
      className={twMerge(
        clsx('flex max-w-[320] animate-fade-in flex-row gap-2', className),
      )}
      {...rest}
    >
      <div className='min-w-[50px] '>
        <Image
          className=' aspect-square rounded-md'
          width='50px'
          height='50px'
          src={cover}
        />
      </div>
      <div className='flex flex-col gap-2 overflow-hidden'>
        <Marquee
          className={twMerge(clsx('text-sm', classNameMarquee))}
          classNameContainer=''
        >
          {name}
        </Marquee>
        <h4 className='line-clamp-1 text-xs text-cod-gray-400'>
          {playListName}
        </h4>
      </div>
    </div>
  )
}

export default SongCard
