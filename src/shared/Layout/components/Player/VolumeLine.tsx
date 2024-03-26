import { Slider } from '@/shared/components/inputs'
import { VolumeFull } from '@/shared/icons'
import { useAppStore } from '@/store'

const VolumeLine = () => {
  const { volumeControl, setVolume } = useAppStore((store) => store)

  const onChangeVolume = (values: number[]) => {
    const [newVolume] = values
    const volumeValue = newVolume / 100
    setVolume(volumeValue)
  }
  return (
    <div className=' ml-auto flex w-32 items-center gap-1'>
      <VolumeFull />
      <Slider
        defaultValue={[volumeControl.initialValue * 100]}
        max={volumeControl.max}
        min={volumeControl.min}
        onValueChange={(values) => onChangeVolume(values)}
      />
    </div>
  )
}

export default VolumeLine
