import { twMerge } from 'tailwind-merge'
import Song from './Song'
import TimeLine from './TimeLine'
import VolumeLine from './VolumeLine'
import { clsx } from 'clsx'
import { useAppStore } from '@/store'
import { useMemo } from 'react'

const Player = () => {
  const currentMusic = useAppStore((store) => store.currentMusic)

  const haveSong = useMemo(() => {
    return Boolean(currentMusic?.song)
  }, [currentMusic?.song])
  return (
    <div
      className={twMerge(
        clsx('flex h-full items-center gap-2', {
          'pointer-events-none opacity-40': !haveSong,
        }),
      )}
    >
      <div className='w-5/6 md:w-2/6'>
        <Song />
      </div>
      <div className='md:w-2/6'>
        <TimeLine />
      </div>
      <div className='hidden md:block md:w-2/6'>
        <VolumeLine />
      </div>
    </div>
  )
}

export default Player
