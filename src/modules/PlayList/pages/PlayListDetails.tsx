import { Hero, TableSongs } from '../components'

const PlayListDetails = () => {
  return (
    <div className='flex h-full flex-col gap-2'>
      <Hero />
      <TableSongs />
    </div>
  )
}

export default PlayListDetails
