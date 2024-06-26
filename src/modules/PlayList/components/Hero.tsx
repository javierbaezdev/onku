import { Image, Marquee } from '@/shared/components'
import { PauseButton, PlayButton } from '@/shared/components/buttons'
import { useAppStore } from '@/store'
import { clsx } from 'clsx'
import { useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  playListId: string
  cover?: string
  playListName?: string
  playListToStore: (indexSong?: number) => void
}

const Hero = ({ playListId, cover, playListName, playListToStore }: Props) => {
  const [isHover, setIsHover] = useState(false)

  const { currentMusic, setPause, setPlay, playerBarControl } = useAppStore(
    (store) => store,
  )

  const isPlayingCurrentPlayList = useMemo(() => {
    return Boolean(
      playerBarControl.isPlaying && currentMusic?.playList?.id === playListId,
    )
  }, [playerBarControl.isPlaying, currentMusic?.playList?.id, playListId])

  const handlePlay = () => {
    playListToStore()
    setPlay()
  }

  return (
    <div className='flex animate-fade-in flex-row gap-4 p-4 animate-delay-200'>
      <div
        className='relative md:min-w-[200px]'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {cover && (
          <Image
            className='aspect-square rounded-md'
            width='200px'
            height='200px'
            src={cover}
          />
        )}
        {!isPlayingCurrentPlayList ? (
          <PlayButton
            className={twMerge(
              clsx('absolute bottom-2 right-2 hidden !bg-carissma-600', {
                'flex scale-105 transition': isHover,
              }),
            )}
            iconClassName='!text-cod-gray-100'
            onClick={handlePlay}
          />
        ) : (
          <PauseButton
            className={twMerge(
              clsx('absolute bottom-2 right-2 hidden bg-carissma-600', {
                'flex scale-105 transition': isHover,
              }),
            )}
            iconClassName='text-cod-gray-100'
            onClick={() => setPause()}
          />
        )}
      </div>
      {playListName && (
        <div className='mr-2 mt-auto flex w-full flex-col justify-start overflow-hidden'>
          <h4 className='line-clamp-1 cursor-default text-xs text-cod-gray-400'>
            Lista de reproducción
          </h4>

          <Marquee
            className='text-xl md:text-6xl'
            classNameContainer='md:min-h-20 md:max-h-20 min-h-10 max-h-10'
          >
            {playListName}
          </Marquee>
        </div>
      )}
    </div>
  )
}

export default Hero
