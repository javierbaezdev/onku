const PlayListCard = () => {
  return (
    <div className='flex w-40 flex-col items-center justify-center gap-2 rounded-md p-2 text-start hover:bg-cod-gray-600/30'>
      <div className='h-[150px] w-[150px] animate-pulse rounded-md bg-cod-gray-400' />
      <div className='h-2 w-36 animate-pulse rounded-md bg-cod-gray-400' />
    </div>
  )
}

export default PlayListCard
