import { Marquee } from '@/shared/components'

const img_test =
  'https://images.sftcdn.net/images/t_app-icon-s/p/7528ab68-b2b0-484d-9310-51bc2ee4d1f7/286660403/anime-avatar-maker-2-4cu-logo'

const Hero = () => {
  return (
    <div className='flex animate-fade-in flex-row gap-4 p-4 animate-delay-200'>
      <div className='md:min-w-[200px]'>
        <img
          className='aspect-square rounded-md'
          width={200}
          height={200}
          src={img_test}
          loading='lazy'
        />
      </div>
      <div className='mr-2 mt-auto flex w-full flex-col justify-start'>
        <h4 className='line-clamp-1 text-xs text-cod-gray-400'>
          Lista de reproducción
        </h4>
        <Marquee className='text-6xl' classNameContainer='min-h-20 max-h-20'>
          聖者の行進 / キタニタツヤ – When The Weak Go Marching In / Tatsuya
          Kitani
        </Marquee>
      </div>
    </div>
  )
}

export default Hero
