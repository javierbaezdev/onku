import { PlayList } from '@/modules/PlayList/types'
import { PlayButton } from './buttons'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

interface Props extends PlayList {}

const PlayListCard = ({ cover, name }: Props) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className='flex w-40 flex-col items-center justify-center gap-2 rounded-md p-2 text-start hover:bg-cod-gray-600/30'
    >
      <div className='relative'>
        <img
          className=' aspect-square rounded-md'
          width={150}
          height={150}
          src={cover}
          loading='lazy'
        />
        <PlayButton
          className={twMerge(
            clsx('bg-carissma-600 r absolute bottom-2 right-2 hidden', {
              'flex scale-105 transition': isHover,
            }),
          )}
          iconClassName='text-cod-gray-100'
        />
      </div>
      <h3 className='line-clamp-1 w-full text-wrap text-sm text-cod-gray-200'>
        {name}
      </h3>
    </div>
  )
}

export default PlayListCard
