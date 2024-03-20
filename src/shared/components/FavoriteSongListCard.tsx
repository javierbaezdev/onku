import { twMerge } from 'tailwind-merge'
import { Marquee } from '.'
import { clsx } from 'clsx'

const img_test =
  'https://images.sftcdn.net/images/t_app-icon-s/p/7528ab68-b2b0-484d-9310-51bc2ee4d1f7/286660403/anime-avatar-maker-2-4cu-logo'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  cover?: string
  name?: string
  playListName?: string
}

const FavoriteSongListCard = ({
  cover,
  name,
  playListName,
  className,
  ...rest
}: Props) => {
  return (
    <div className={twMerge(clsx('flex flex-row gap-2', className))} {...rest}>
      <div className='min-w-[50px]'>
        <img
          className=' aspect-square rounded-md'
          width={50}
          height={50}
          src={cover || img_test}
          loading='lazy'
        />
      </div>
      <div className='flex flex-col gap-2 overflow-hidden'>
        <Marquee className='text-sm' classNameContainer=''>
          {name ||
            '日本語 with あこ - Nihongo Picnic Podcast Podcast Podcast Podcast'}
        </Marquee>
        <h4 className='line-clamp-1 text-xs text-cod-gray-400'>
          {playListName || '日本語'}
        </h4>
      </div>
    </div>
  )
}

export default FavoriteSongListCard
