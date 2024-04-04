import { Pause } from '@/shared/icons'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  iconClassName?: string
}

const PauseButton = ({ className, iconClassName, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        clsx('flex size-9 items-center justify-center rounded-full', className),
      )}
      {...rest}
    >
      <Pause className={twMerge(clsx('', iconClassName))} />
    </button>
  )
}

export default PauseButton
