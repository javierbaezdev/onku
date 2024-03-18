import { useGetAll } from '@/shared/hooks'
import { PATHS } from '../paths'
import PlayListCard from '@/shared/components/PlayListCard'
import { type PlayList } from '@/modules/PlayList/types'
import { Alert } from '@/shared/components'
import { Min01 } from '@/shared/components/loaders'

const PlayListComponent = () => {
  const {
    data: playLists,
    isError,
    refetch,
    isLoading,
  } = useGetAll<PlayList[], PlayList[]>({
    getAllProps: {
      endPoint: PATHS.PLAY_LISTS.API,
    },
    key: PATHS.PLAY_LISTS.KEY,
  })

  return (
    <>
      {!isLoading && isError && (
        <Alert
          msg='¡Error al cargar listas de reproducción!'
          description='Lo sentimos, pero actualmente estamos experimentando problemas al cargar las listas de reproducción. Esto puede deberse a problemas técnicos temporales. Por favor, inténtalo de nuevo más tarde. Gracias por tu paciencia y comprensión mientras trabajamos para resolver este problema.'
          actionFunc={() => refetch()}
          actionTextButton='Reintentar'
        />
      )}
      {isLoading && <Min01 />}
      {!isError && !isLoading && playLists && (
        <div className='flex flex-grow flex-row gap-2'>
          {playLists?.map((item) => <PlayListCard key={item.id} {...item} />)}
        </div>
      )}
    </>
  )
}

export default PlayListComponent
