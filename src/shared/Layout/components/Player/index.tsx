import Song from './Song'
import TimeLine from './TimeLine'
import VolumeLine from './VolumeLine'

const Player = () => {
  return (
    <div className='flex h-full items-center gap-2'>
      <div className='md:w-2/6'>
        <Song />
      </div>
      <div className='md:w-2/6'>
        <TimeLine />
      </div>
      <div className='  md:w-2/6'>
        <VolumeLine />
      </div>
    </div>
  )
}

export default Player
