import { formatTime } from '@/shared/utils'
import { useRef } from 'react'

interface Props {
  urlSong: string
}

const DurationSong = ({ urlSong }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      console.log(formatTime(audioRef.current.duration))
    }
  }
  return (
    <>
      <audio ref={audioRef} onLoadedMetadata={onLoadedMetadata} src={urlSong} />
      <p>{formatTime(audioRef?.current?.duration || 0)}</p>
    </>
  )
}

export default DurationSong
