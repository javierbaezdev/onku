import { TimeFormat } from '@/shared/components'
import { PauseButton, PlayButton } from '@/shared/components/buttons'
import { Slider } from '@/shared/components/inputs'
import { useAppStore } from '@/store'
import { useEffect, useRef } from 'react'

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
    if (audioRef?.current && volumeControl?.value) {
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
      <div className='flex items-center justify-center'>
        {!playerBarControl.isPlaying ? (
          <PlayButton onClick={() => setPlay()} />
        ) : (
          <PauseButton onClick={() => setPause()} />
        )}
      </div>
      <div className='flex items-center gap-1'>
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
    </div>
  )
}

export default TimeLine
