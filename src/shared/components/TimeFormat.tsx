import { twMerge } from 'tailwind-merge'
import { formatTime } from '../utils'
import { clsx } from 'clsx'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  value: number
}

const TimeFormat = ({ value, className, ...rest }: Props) => {
  return (
    <span
      className={twMerge(
        clsx(
          'min-w-8 cursor-default text-[10px] font-light text-cod-gray-300',
          className,
        ),
      )}
      {...rest}
    >
      {formatTime(value)}
    </span>
  )
}

export default TimeFormat
