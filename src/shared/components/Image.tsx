import { clsx } from 'clsx'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { GRAY_IMG } from '../constants/general'

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  width?: string
  height?: string
  src?: string
}

const Image = ({ className, ...rest }: Props) => {
  const [loaded, setLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleImageLoaded = () => {
    setLoaded(true)
  }

  const handleImageError = () => {
    setIsError(true)
  }

  return (
    <>
      {!loaded && !isError && (
        <div
          className={twMerge(
            clsx('h-fit w-fit', {
              'animate-pulse': loaded && !isError,
            }),
          )}
        >
          <img
            className={twMerge(clsx('', className))}
            src={GRAY_IMG}
            alt='Color Square'
            width={rest.width}
            height={rest.height}
          />
        </div>
      )}
      <img
        className={twMerge(
          clsx('', className, {
            'absolute opacity-0': !loaded,
            'opacity-100': loaded && !isError,
          }),
        )}
        loading='eager'
        decoding='async'
        onLoad={handleImageLoaded}
        onError={handleImageError}
        {...rest}
      />
    </>
  )
}

export default Image
