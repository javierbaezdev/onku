import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

const IrregularButton = ({ className, children, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        clsx(
          `flex
          flex-row
          gap-1
          border-old-lace-300
            dark:border-bunker-900 
             hover:bg-old-lace-300 
             dark:hover:bg-bunker-900
             text-rock-400 
             dark:text-bunker-50 
             font-bold 
             py-0.5 
             px-4 
             transform 
             -skew-x-[20deg] 
             transition 
             duration-300 
             ease-in-out 
             border
             hover:scale-105
             `,

          className
        )
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default IrregularButton
