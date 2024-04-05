import { Image, Marquee, TimeFormat } from '@/shared/components'
import {
  BasicButton,
  PauseButton,
  PlayButton,
} from '@/shared/components/buttons'
import {
  BackSeconds,
  DiskOnku,
  FullScreen as FullScreenIcon,
  Heart,
  NextSong,
  SkipSeconds,
  VolumeFull,
  VolumeMedium,
  VolumeMin,
  VolumeMute,
} from '@/shared/icons'
import { useAppPersistStore, useAppStore } from '@/store'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { RefObject, useEffect, useMemo } from 'react'
import { Slider } from '@/shared/components/inputs'

interface Props {
  audioRef: RefObject<HTMLAudioElement>
}

const FullPlayer = ({ audioRef }: Props) => {
  const {
    setFullScreen,
    currentMusic,
    playerBarControl,
    setPlay,
    setPause,
    onNextSong,
    onPreviewSong,
    volumeControl,
    setVolume,
    deleteFavoriteSong,
  } = useAppStore((store) => store)
  const { favoritesSongsIds, addNewFavoriteId, deleteFavoriteId } =
    useAppPersistStore((store) => store)

  const handleFavoriteSong = (songId: string) => {
    if (favoritesSongsIds.includes(songId)) {
      deleteFavoriteId(songId)
      deleteFavoriteSong(songId)
    } else {
      addNewFavoriteId(songId)
    }
  }

  const onChangeVolume = (values: number[], isMute?: boolean) => {
    const [newVolume] = values
    const volumeValue = newVolume / 100
    setVolume(volumeValue, isMute)
  }

  const volumeIcon = useMemo(() => {
    if (volumeControl?.value !== undefined) {
      if (volumeControl.value === 0)
        return (
          <VolumeMute
            className='cursor-pointer'
            onClick={() =>
              onChangeVolume([
                volumeControl.lastVolume !== undefined
                  ? volumeControl.lastVolume * 100
                  : volumeControl.initialValue * 100,
              ])
            }
          />
        )
      if (volumeControl.value > 0.0 && volumeControl.value <= 0.25)
        return (
          <VolumeMin
            className='cursor-pointer'
            onClick={() => onChangeVolume([0], true)}
          />
        )
      if (volumeControl.value > 0.25 && volumeControl.value < 0.55)
        return (
          <VolumeMedium
            className='cursor-pointer'
            onClick={() => onChangeVolume([0], true)}
          />
        )
      if (volumeControl.value >= 0.55)
        return (
          <VolumeFull
            className='cursor-pointer'
            onClick={() => onChangeVolume([0], true)}
          />
        )
    }
    return (
      <VolumeMin
        className='cursor-pointer'
        onClick={() => onChangeVolume([0], true)}
      />
    )
  }, [volumeControl])

  const skipCurrentTime = () => {
    if (audioRef.current && playerBarControl.currentTime) {
      audioRef.current.currentTime = playerBarControl.currentTime + 15
    }
  }
  const backCurrentTime = () => {
    if (audioRef.current && playerBarControl.currentTime) {
      const newTime = playerBarControl.currentTime - 15
      audioRef.current.currentTime = newTime <= 0 ? 0 : newTime
    }
  }

  const onChangeProgressSong = (values: number[]) => {
    const [newCurrentTime] = values
    if (audioRef.current) {
      audioRef.current.currentTime = newCurrentTime
    }
  }

  return (
    <>
      {/* md */}
      <div className='fixed inset-0 z-[9000] hidden h-screen w-screen animate-pulse-fade-in flex-col gap-2 bg-cod-gray-400 bg-gradient-to-b from-cod-gray-950/50 to-cod-gray-950 md:flex'>
        {currentMusic.playList?.fullCover && (
          <Image
            className='pointer-events-none absolute -z-10 h-full w-full animate-tada !opacity-20 animate-delay-1000'
            src={currentMusic.playList?.fullCover}
            width='100%'
            height='100%'
          />
        )}
        <BasicButton
          className='m-6 ml-auto rounded-full bg-carissma-700 p-2 hover:scale-110'
          onClick={() => setFullScreen(false)}
        >
          <FullScreenIcon />
        </BasicButton>
        <div className='flex h-full w-full flex-col justify-center gap-2 px-28'>
          <div className='flex gap-6'>
            <div className='flex h-full items-center'>
              <div className='relative'>
                <Image
                  className='aspect-square animate-slide-in-top rounded-md animate-delay-300'
                  width='200px'
                  height='200px'
                  src={currentMusic?.playList?.cover}
                />
                {playerBarControl.isPlaying && (
                  <div className='absolute -top-24 left-0.5 -z-10 animate-rotate-360 animate-duration-1000 animate-iteration-count-infinite'>
                    <DiskOnku
                      className='animate-zoom-in text-carissma-600'
                      width={170}
                      height={170}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className=' flex h-full w-full items-center'>
              <ul className='content-pages  max-h-[170px] w-full overflow-y-auto'>
                {currentMusic?.songs?.map((song, index) => (
                  <li
                    key={song.id}
                    className={twMerge(
                      clsx('', {
                        'text-carissma-600': song.id === currentMusic.song?.id,
                      }),
                    )}
                  >
                    <span className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{`${index + 1} - ${song.name}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <Marquee
              className='text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
              classNameContainer='min-h-20 max-h-20'
            >
              {currentMusic.playList?.name || ''}
            </Marquee>
          </div>
        </div>

        {/* player */}
        <div className='flex flex-col items-center justify-center gap-2 px-28 pb-28'>
          <div className='flex w-full items-center gap-1'>
            <TimeFormat value={playerBarControl.currentTime} />
            <Slider
              defaultValue={[playerBarControl.initialValue]}
              value={[playerBarControl.currentTime]}
              max={audioRef.current?.duration || playerBarControl.max}
              min={playerBarControl.min}
              onValueChange={(values) => onChangeProgressSong(values)}
            />
            <TimeFormat
              value={audioRef.current?.duration || 0}
              className='text-end'
            />
          </div>
          <div className='relative flex h-full w-full flex-row'>
            <div className='flex w-full items-center justify-center gap-6'>
              <BasicButton
                onClick={() => backCurrentTime()}
                isDisabled={Boolean(
                  !audioRef.current || !playerBarControl.currentTime,
                )}
              >
                <BackSeconds />
              </BasicButton>
              <BasicButton
                isDisabled={Boolean(
                  currentMusic?.songs?.at(0)?.id === currentMusic?.song?.id,
                )}
                onClick={() => onPreviewSong()}
              >
                <NextSong transform='rotate(180)' />
              </BasicButton>

              {!playerBarControl.isPlaying ? (
                <PlayButton onClick={() => setPlay()} />
              ) : (
                <PauseButton onClick={() => setPause()} />
              )}
              <BasicButton
                isDisabled={Boolean(
                  currentMusic?.songs?.at(-1)?.id === currentMusic?.song?.id,
                )}
                onClick={() => onNextSong()}
              >
                <NextSong />
              </BasicButton>
              <BasicButton
                onClick={skipCurrentTime}
                isDisabled={Boolean(
                  !audioRef.current || !playerBarControl.currentTime,
                )}
              >
                <SkipSeconds />
              </BasicButton>
            </div>
            <div className='absolute bottom-auto right-0 top-4 flex h-5 w-36 flex-row items-center gap-2'>
              {volumeIcon}

              <Slider
                defaultValue={[volumeControl.initialValue * 100]}
                value={[
                  volumeControl.value !== undefined
                    ? volumeControl.value * 100
                    : volumeControl.initialValue * 100,
                ]}
                max={volumeControl.max}
                min={volumeControl.min}
                onValueChange={(values) => onChangeVolume(values)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* sm */}
      <div className='fixed inset-0 z-[9000] flex h-screen w-screen animate-pulse-fade-in bg-carissma-400 bg-gradient-to-b from-carissma-950/50 to-carissma-950 md:hidden'>
        <div className='flex h-full w-full flex-col gap-4'>
          <BasicButton
            className='m-2 ml-auto rounded-full bg-carissma-700 p-2 hover:scale-110'
            onClick={() => setFullScreen(false)}
          >
            <FullScreenIcon />
          </BasicButton>

          <div className='mx-6 flex aspect-square items-center justify-center bg-carissma-600'>
            <Image
              className='aspect-square animate-slide-in-top rounded-md animate-delay-300'
              width='250px'
              height='250px'
              src={currentMusic?.song?.cover}
            />
          </div>

          <div className='mx-6 flex flex-row items-center gap-2'>
            <div className='w-full overflow-hidden'>
              <Marquee
                className='text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
                classNameContainer='min-h-10 max-h-10'
              >
                {currentMusic.song?.name || ''}
              </Marquee>
              <Marquee
                className='text-md font-thin drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
                classNameContainer='min-h-10 max-h-10'
              >
                {currentMusic.playList?.name || ''}
              </Marquee>
            </div>
            <div className='min-w-7'>
              <BasicButton
                onClick={() => handleFavoriteSong(currentMusic?.song?.id || '')}
                className={twMerge(
                  clsx('text-cod-gray-200', {
                    'animate-tada text-carissma-500':
                      favoritesSongsIds.includes(currentMusic?.song?.id || ''),
                  }),
                )}
              >
                <Heart width={24} height={24} />
              </BasicButton>
            </div>
          </div>

          <div className='mx-6 mt-auto flex flex-col gap-2'>
            <Slider
              defaultValue={[playerBarControl.initialValue]}
              value={[playerBarControl.currentTime]}
              max={audioRef.current?.duration || playerBarControl.max}
              min={playerBarControl.min}
              onValueChange={(values) => onChangeProgressSong(values)}
            />
            <div className='flex justify-between'>
              <TimeFormat
                className='text-lg'
                value={playerBarControl.currentTime}
              />
              <TimeFormat
                value={audioRef.current?.duration || 0}
                className='text-end text-lg'
              />
            </div>
          </div>

          <div className='mx-6 mt-auto flex justify-between pb-4'>
            <BasicButton
              onClick={() => backCurrentTime()}
              isDisabled={Boolean(
                !audioRef.current || !playerBarControl.currentTime,
              )}
            >
              <BackSeconds />
            </BasicButton>
            <BasicButton
              isDisabled={Boolean(
                currentMusic?.songs?.at(0)?.id === currentMusic?.song?.id,
              )}
              onClick={() => onPreviewSong()}
            >
              <NextSong transform='rotate(180)' />
            </BasicButton>

            {!playerBarControl.isPlaying ? (
              <PlayButton
                className='bg-cod-gray-200'
                iconClassName='text-black'
                onClick={() => setPlay()}
              />
            ) : (
              <PauseButton
                className='bg-cod-gray-200'
                iconClassName='text-black'
                onClick={() => setPause()}
              />
            )}
            <BasicButton
              isDisabled={Boolean(
                currentMusic?.songs?.at(-1)?.id === currentMusic?.song?.id,
              )}
              onClick={() => onNextSong()}
            >
              <NextSong />
            </BasicButton>
            <BasicButton
              onClick={skipCurrentTime}
              isDisabled={Boolean(
                !audioRef.current || !playerBarControl.currentTime,
              )}
            >
              <SkipSeconds />
            </BasicButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default FullPlayer
