import { Slider } from '@/shared/components/inputs'
import { VolumeFull } from '@/shared/icons'

const VolumeLine = () => {
  return (
    <div className=' ml-auto flex w-32 items-center gap-1'>
      <VolumeFull />
      <Slider defaultValue={[50]} max={100} min={0} />
    </div>
  )
}

export default VolumeLine
