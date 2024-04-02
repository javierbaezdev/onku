import { forwardRef, useState } from 'react'
import { Range, Thumb, Track, Root } from '@radix-ui/react-slider'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Slider = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <Root
      ref={ref}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={clsx(
        'group relative flex h-1 w-full touch-none select-none items-center rounded-full bg-cod-gray-500',
        className,
      )}
      {...props}
    >
      <Track className='bg-primary/20 relative h-1 w-full grow overflow-hidden rounded-full'>
        <Range
          className={twMerge(
            clsx('absolute h-full cursor-pointer bg-cod-gray-100', {
              'bg-carissma-500': isHover,
            }),
          )}
        />
      </Track>
      <Thumb
        className={twMerge(
          clsx(
            'bg-background focus-visible:ring-ring block h-3 w-3 cursor-pointer rounded-full shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
            { 'bg-cod-gray-100': isHover },
          ),
        )}
      />
    </Root>
  )
})
Slider.displayName = Root.displayName

export default Slider
