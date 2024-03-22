import { PlayList } from '@/modules/PlayList/types'
import { PlayButton } from './buttons'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/modules/PlayList/paths'

interface Props extends PlayList {}

const PlayListCard = ({ cover, name, id }: Props) => {
  const [isHover, setIsHover] = useState(false)
  const navigate = useNavigate()

  const goDetails = () => {
    navigate(`/${PATHS.PLAY_LISTS.CLI}/${PATHS.PLAY_LISTS_DETAILS.CLI}/${id}`)
  }

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => goDetails()}
      className='flex w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-md p-2 text-start hover:bg-cod-gray-600/30'
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
            clsx('r absolute bottom-2 right-2 hidden bg-carissma-600', {
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
