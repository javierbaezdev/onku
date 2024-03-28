import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element
  isDisabled?: boolean
}

const BasicButton = ({ className, children, isDisabled, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        clsx('', className, { 'pointer-events-none opacity-40': isDisabled }),
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default BasicButton
