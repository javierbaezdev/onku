import { useParams } from 'react-router-dom'
import { Header, Hero, TableSongs } from '../components'

const PlayListDetails = () => {
  const { playListId } = useParams()
  console.log({ playListId })
  return (
    <div className='flex h-full animate-fade-in flex-col gap-2 animate-delay-100'>
      <Header />
      <Hero />
      <TableSongs />
    </div>
  )
}

export default PlayListDetails
