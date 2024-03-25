const Hero = () => {
  return (
    <div className='flex flex-row gap-4 p-4'>
      <div className='min-h-[200px] animate-pulse rounded-md bg-cod-gray-400 md:min-w-[200px]'></div>

      <div className='mr-2 mt-auto flex w-full flex-col justify-start gap-2'>
        <div className='h-2 w-20 animate-pulse rounded-md bg-cod-gray-400' />
        <div className='h-10 w-1/2 animate-pulse rounded-md bg-cod-gray-400' />
      </div>
    </div>
  )
}

export default Hero
