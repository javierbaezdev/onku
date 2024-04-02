import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  width?: number
  height?: number
  src?: string
}

const Image = ({ className, ...rest }: Props) => {
  return (
    <img
      className={twMerge(clsx('', className))}
      loading='eager'
      decoding='async'
      {...rest}
    />
  )
}

export default Image
