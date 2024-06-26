import { PlayList } from '@/modules/PlayList/types'
import { PauseButton, PlayButton } from './buttons'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/modules/PlayList/paths'
import { useAppStore } from '@/store'
import { Image, Marquee } from '.'

interface Props extends PlayList {}

const PlayListCard = ({ cover, name, id, songs, fullCover }: Props) => {
  const [isHover, setIsHover] = useState(false)
  const [isHoverPlayButton, setIsHoverPlayButton] = useState(false)
  const navigate = useNavigate()

  const { playerBarControl, currentMusic, setPause, setPlay, setCurrentMusic } =
    useAppStore((store) => store)

  const isPlayingCurrentPlayList = useMemo(() => {
    return Boolean(
      playerBarControl.isPlaying && currentMusic?.playList?.id === id,
    )
  }, [playerBarControl.isPlaying, currentMusic?.playList?.id, id])

  const goDetails = () => {
    navigate(`/${PATHS.PLAY_LISTS.CLI}/${PATHS.PLAY_LISTS_DETAILS.CLI}/${id}`)
  }

  const handlePlay = () => {
    if (currentMusic?.playList?.id !== id) {
      setCurrentMusic({
        playList: { cover, name, id, songs, fullCover },
        songs: songs,
        song: songs[0],
      })
    }
    setPlay()
  }

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={!isHoverPlayButton ? () => goDetails() : undefined}
      className='flex w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-md p-2 text-start hover:bg-cod-gray-600/30'
    >
      <div className='relative'>
        <Image
          className='aspect-square rounded-md'
          width='150px'
          height='150px'
          src={cover}
        />
        {!isPlayingCurrentPlayList ? (
          <PlayButton
            className={twMerge(
              clsx('absolute bottom-2 right-2 hidden !bg-carissma-600', {
                'flex scale-105 transition': isHover,
              }),
            )}
            iconClassName='!text-cod-gray-100'
            onMouseEnter={() => setIsHoverPlayButton(true)}
            onMouseLeave={() => setIsHoverPlayButton(false)}
            onClick={handlePlay}
          />
        ) : (
          <PauseButton
            className={twMerge(
              clsx('r absolute bottom-2 right-2 hidden !bg-carissma-600', {
                'flex scale-105 transition': isHover,
              }),
            )}
            iconClassName='!text-cod-gray-100'
            onMouseEnter={() => setIsHoverPlayButton(true)}
            onMouseLeave={() => setIsHoverPlayButton(false)}
            onClick={() => setPause()}
          />
        )}
      </div>
      <div className='mr-auto w-[95%] overflow-hidden'>
        <Marquee
          className='justify-start text-sm text-cod-gray-200'
          classNameContainer='justify-start'
        >
          {name}
        </Marquee>
      </div>
    </div>
  )
}

export default PlayListCard
