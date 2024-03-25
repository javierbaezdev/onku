const FavoriteCard = () => {
  return (
    <div className='flex flex-row items-center gap-2'>
      <div className='h-14 w-14 animate-pulse rounded-md bg-cod-gray-400'></div>
      <div className='flex flex-col gap-2'>
        <div className='h-2 w-10 animate-pulse rounded-md bg-cod-gray-400'></div>
        <div className='h-2 w-40 animate-pulse rounded-md bg-cod-gray-400'></div>
      </div>
    </div>
  )
}

export default FavoriteCard
