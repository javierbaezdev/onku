import { clsx } from 'clsx'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: string
  classNameContainer?: string
}
const Marquee = ({ children, className, classNameContainer }: Props) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      className={twMerge(clsx('max-h-6 overflow-hidden', classNameContainer))}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h1
        className={twMerge(
          clsx('line-clamp-1 py-1 text-cod-gray-200', className, {
            ' inline-block animate-marquee cursor-default overflow-hidden whitespace-nowrap':
              isHover,
          }),
        )}
      >
        <>{children}</>
      </h1>
    </div>
  )
}

export default Marquee
