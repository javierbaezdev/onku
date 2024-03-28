import { formatTime } from '../utils'

interface Props {
  value: number
}

const TimeFormat = ({ value }: Props) => {
  return (
    <span className='text-[10px] font-light text-cod-gray-300'>
      {formatTime(value)}
    </span>
  )
}

export default TimeFormat
