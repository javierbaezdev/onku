import { BasicButton } from '@/shared/components/buttons'
import { Slider } from '@/shared/components/inputs'
import {
  FullScreen as FullScreenIcon,
  VolumeFull,
  VolumeMedium,
  VolumeMin,
  VolumeMute,
} from '@/shared/icons'
import { useAppStore } from '@/store'
import { useMemo } from 'react'

const VolumeLine = () => {
  const { volumeControl, setVolume, setFullScreen } = useAppStore(
    (store) => store,
  )

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

  return (
    <div className=' ml-auto flex w-36 items-center gap-1'>
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
      <BasicButton onClick={() => setFullScreen(true)}>
        <FullScreenIcon />
      </BasicButton>
    </div>
  )
}

export default VolumeLine
