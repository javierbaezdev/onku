import { twMerge } from 'tailwind-merge'
import { Marquee } from '.'
import { clsx } from 'clsx'
import { PauseButton, PlayButton } from './buttons'
import { useAppStore } from '@/store'
import { FAVORITE_PLAY_LIST } from '@/shared/constants/general'
import { useMemo, useState } from 'react'
import { VolumeFull } from '../icons'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  cover: string
  name: string
  playListName: string
  classNameMarquee?: string
}

const FavoriteSongListCard = ({
  id,
  cover,
  name,
  playListName,
  className,
  classNameMarquee,
  ...rest
}: Props) => {
  const [isHover, setIsHover] = useState(false)
  const { currentMusic, setPause, setPlay, setCurrentMusic, playerBarControl } =
    useAppStore((store) => store)

  const isPlayingCurrentFavoriteSong = useMemo(() => {
    return Boolean(playerBarControl.isPlaying && currentMusic?.song?.id === id)
  }, [playerBarControl.isPlaying, currentMusic?.song?.id, id])

  const handlePlay = () => {
    if (currentMusic?.favoriteSongs) {
      const indexFavoriteSong = currentMusic?.favoriteSongs?.findIndex(
        (song) => song.id === id,
      )
      const favoriteCurrentMusic = {
        playList: { ...FAVORITE_PLAY_LIST },
        songs: currentMusic?.favoriteSongs,
        song: currentMusic?.favoriteSongs[indexFavoriteSong],
      }
      setCurrentMusic(favoriteCurrentMusic)
      setPlay()
    }
  }

  return (
    <div
      className={twMerge(
        clsx('flex max-w-[320] animate-fade-in flex-row gap-2', className),
      )}
      {...rest}
    >
      <div
        className='relative min-w-[50px]'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          className=' aspect-square rounded-md'
          width={50}
          height={50}
          src={cover}
          loading='eager'
        />
        {!isPlayingCurrentFavoriteSong ? (
          <PlayButton
            className={twMerge(
              clsx('absolute bottom-2 right-2 hidden bg-carissma-600', {
                'flex scale-105 transition': isHover,
              }),
            )}
            iconClassName='text-cod-gray-100'
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
      <div className='flex flex-col gap-2 overflow-hidden'>
        <Marquee
          className={twMerge(clsx('text-sm', classNameMarquee))}
          classNameContainer=''
        >
          {name}
        </Marquee>
        <div className='flex flex-row gap-2'>
          <h4 className='line-clamp-1 text-xs text-cod-gray-400'>
            {playListName}
          </h4>
          {isPlayingCurrentFavoriteSong && (
            <VolumeFull className='text-carissma-600' width={14} height={14} />
          )}
        </div>
      </div>
    </div>
  )
}

export default FavoriteSongListCard
