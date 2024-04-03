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
  NextSong,
  SkipSeconds,
  VolumeFull,
  VolumeMedium,
  VolumeMin,
  VolumeMute,
} from '@/shared/icons'
import { useAppStore } from '@/store'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { RefObject, useMemo } from 'react'
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
  } = useAppStore((store) => store)

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
    <div className='fixed inset-0 z-[9000] flex h-screen w-screen animate-pulse-fade-in flex-col gap-2 bg-cod-gray-400 bg-gradient-to-b from-cod-gray-950/50 to-cod-gray-950'>
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
  )
}

export default FullPlayer
