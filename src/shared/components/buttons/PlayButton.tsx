import { Play } from '@/shared/icons'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  iconClassName?: string
}

const PlayButton = ({ className, iconClassName, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        clsx(
          'flex size-9 items-center justify-center rounded-full bg-cod-gray-200',
          className,
        ),
      )}
      {...rest}
    >
      <Play className={twMerge(clsx('text-cod-gray-950', iconClassName))} />
    </button>
  )
}

export default PlayButton
