import { formatTime } from '@/shared/utils'
import { useRef, useState } from 'react'

interface Props {
  urlSong: string
}

const DurationSong = ({ urlSong }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState(0)
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }
  return (
    <>
      <audio ref={audioRef} onLoadedMetadata={onLoadedMetadata} src={urlSong} />
      <p>{formatTime(duration)}</p>
    </>
  )
}

export default DurationSong
