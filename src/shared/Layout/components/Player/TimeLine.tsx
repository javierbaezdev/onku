import { TimeFormat } from '@/shared/components'
import { PlayButton } from '@/shared/components/buttons'
import { Slider } from '@/shared/components/inputs'

const TimeLine = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-center'>
        <PlayButton />
      </div>
      <div className='flex items-center gap-1'>
        <TimeFormat />
        <Slider defaultValue={[50]} max={100} min={0} />
        <TimeFormat />
      </div>
    </div>
  )
}

export default TimeLine
