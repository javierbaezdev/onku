import { TimeFormat } from '@/shared/components'
import {
  BasicButton,
  PauseButton,
  PlayButton,
} from '@/shared/components/buttons'
import { Slider } from '@/shared/components/inputs'
import { BackSeconds, NextSong, SkipSeconds } from '@/shared/icons'
import { useAppStore } from '@/store'
import { useEffect, useRef } from 'react'
import FullPlayer from './FullPlayer'

const TimeLine = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    playerBarControl,
    setPlay,
    setPause,
    currentMusic,
    volumeControl,
    setCurrentTime,
    onNextSong,
    onPreviewSong,
    isFullScreen,
  } = useAppStore((store) => store)

  const onChangeProgressSong = (values: number[]) => {
    const [newCurrentTime] = values
    if (audioRef.current) {
      audioRef.current.currentTime = newCurrentTime
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

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

  useEffect(() => {
    if (audioRef.current) {
      playerBarControl.isPlaying
        ? audioRef.current.play()
        : audioRef.current.pause()
    }
  }, [playerBarControl.isPlaying])

  useEffect(() => {
    if (currentMusic?.song && audioRef?.current) {
      const { song } = currentMusic
      if (song) {
        const src = song.url
        audioRef.current.src = src
        audioRef.current.volume =
          volumeControl?.value || volumeControl.initialValue

        audioRef?.current?.play()
      }
    }
  }, [currentMusic?.song])

  useEffect(() => {
    if (audioRef?.current && volumeControl?.value !== undefined) {
      audioRef.current.volume = volumeControl?.value
    }
  }, [volumeControl?.value])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate)

      return () => {
        audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [audioRef, handleTimeUpdate])

  useEffect(() => {
    if (audioRef.current) {
      if (playerBarControl.currentTime >= audioRef.current?.duration) {
        onNextSong()
      }
    }
  }, [playerBarControl.currentTime])

  return (
    <div className='flex flex-col gap-3'>
      <audio ref={audioRef} />
      <div className='flex items-center justify-center gap-6'>
        <BasicButton
          className='hidden md:block'
          onClick={() => backCurrentTime()}
          isDisabled={Boolean(
            !audioRef.current || !playerBarControl.currentTime,
          )}
        >
          <BackSeconds />
        </BasicButton>
        <BasicButton
          className='hidden md:block'
          isDisabled={Boolean(
            currentMusic?.songs?.at(0)?.id === currentMusic?.song?.id,
          )}
          onClick={() => onPreviewSong()}
        >
          <NextSong transform='rotate(180)' />
        </BasicButton>

        {!playerBarControl.isPlaying ? (
          <PlayButton
            className='md:bg-cod-gray-200'
            iconClassName='md:text-black'
            onClick={() => setPlay()}
          />
        ) : (
          <PauseButton
            className='md:bg-cod-gray-200'
            iconClassName='md:text-black'
            onClick={() => setPause()}
          />
        )}
        <BasicButton
          className='hidden md:block'
          isDisabled={Boolean(
            currentMusic?.songs?.at(-1)?.id === currentMusic?.song?.id,
          )}
          onClick={() => onNextSong()}
        >
          <NextSong />
        </BasicButton>
        <BasicButton
          className='hidden md:block'
          onClick={skipCurrentTime}
          isDisabled={Boolean(
            !audioRef.current || !playerBarControl.currentTime,
          )}
        >
          <SkipSeconds />
        </BasicButton>
      </div>
      <div className='hidden items-center justify-center md:flex md:gap-1'>
        <TimeFormat value={playerBarControl.currentTime} />

        <Slider
          defaultValue={[playerBarControl.initialValue]}
          value={[playerBarControl.currentTime]}
          max={audioRef.current?.duration || playerBarControl.max}
          min={playerBarControl.min}
          onValueChange={(values) => onChangeProgressSong(values)}
        />
        <TimeFormat value={audioRef.current?.duration || 0} />
      </div>
      {isFullScreen && <FullPlayer audioRef={audioRef} />}
    </div>
  )
}

export default TimeLine
