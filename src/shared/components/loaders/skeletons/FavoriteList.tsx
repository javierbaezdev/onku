import { FavoriteCard } from '.'

const FavoriteList = () => {
  return (
    <div className='flex flex-col gap-2'>
      <FavoriteCard />
      <FavoriteCard />
      <FavoriteCard />
    </div>
  )
}

export default FavoriteList
