import { useParams } from 'react-router-dom'
import { Header, Hero, TableSongs } from '../components'
import { PATHS } from '../paths'
import { useGetAll } from '@/shared/hooks'
import { PlayList } from '../types'
import { Alert } from '@/shared/components'
import { PlayListDetailsSkeleton } from '@/shared/components/loaders/skeletons'

const PlayListDetails = () => {
  const { playListId } = useParams()
  const {
    data: playList,
    isError,
    refetch,
    isLoading,
  } = useGetAll<PlayList, PlayList>({
    getAllProps: {
      endPoint: PATHS.PLAY_LISTS.API,
      queries: { playlistId: playListId },
    },
    queryConfig: {
      enabled: Boolean(playListId),
    },
    key: PATHS.PLAY_LISTS_DETAILS.KEY,
  })

  return (
    <div className='flex h-full animate-fade-in flex-col gap-2 animate-delay-100'>
      {!isLoading && isError && (
        <Alert
          msg='¡Error al cargar la lista de reproducción!'
          description='Lo sentimos, pero actualmente estamos experimentando problemas al cargar la lista de reproducción. Esto puede deberse a problemas técnicos temporales. Por favor, inténtalo de nuevo más tarde. Gracias por tu paciencia y comprensión mientras trabajamos para resolver este problema.'
          actionFunc={() => refetch()}
          actionTextButton='Reintentar'
        />
      )}
      {isLoading && (
        <>
          <Header />
          <PlayListDetailsSkeleton />
        </>
      )}
      {!isError && !isLoading && playList && (
        <>
          <Hero cover={playList?.cover} playListName={playList?.name} />
          <TableSongs songs={playList?.songs} />
        </>
      )}
    </div>
  )
}

export default PlayListDetails
