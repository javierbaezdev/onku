import { PLAY_LIST_COUNT } from '@/shared/constants/general'
import { PlayListCard } from '.'

const PlayListSkeleton = () => {
  const LIST: null[] = new Array(PLAY_LIST_COUNT).fill(null)

  return (
    <div className='flex flex-row flex-wrap gap-2'>
      {LIST.map((_, index) => (
        <PlayListCard key={index} />
      ))}
    </div>
  )
}

export default PlayListSkeleton
