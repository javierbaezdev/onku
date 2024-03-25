import { Marquee } from '@/shared/components'

interface Props {
  cover?: string
  playListName?: string
}

const Hero = ({ cover, playListName }: Props) => {
  return (
    <div className='flex animate-fade-in flex-row gap-4 p-4 animate-delay-200'>
      <div className='md:min-w-[200px]'>
        {cover && (
          <img
            className='aspect-square rounded-md'
            width={200}
            height={200}
            src={cover}
            loading='lazy'
          />
        )}
      </div>
      {playListName && (
        <div className='mr-2 mt-auto flex w-full flex-col justify-start'>
          <h4 className='line-clamp-1 text-xs text-cod-gray-400'>
            Lista de reproducción
          </h4>

          <Marquee className='text-6xl' classNameContainer='min-h-20 max-h-20'>
            {playListName}
          </Marquee>
        </div>
      )}
    </div>
  )
}

export default Hero
