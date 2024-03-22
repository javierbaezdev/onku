import { useGetAll } from '@/shared/hooks'
import { PATHS } from '../paths'
import PlayListCard from '@/shared/components/PlayListCard'
import { type PlayList } from '@/modules/PlayList/types'
import { Alert } from '@/shared/components'
import { PlayListSkeleton } from '@/shared/components/loaders/skeletons'

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
    <div className='flex animate-fade-in flex-col gap-2 animate-delay-100'>
      <h1 className='pl-2 text-lg font-semibold text-cod-gray-200'>
        Lista de reproducciones
      </h1>
      {!isLoading && isError && (
        <Alert
          msg='¡Error al cargar listas de reproducción!'
          description='Lo sentimos, pero actualmente estamos experimentando problemas al cargar las listas de reproducción. Esto puede deberse a problemas técnicos temporales. Por favor, inténtalo de nuevo más tarde. Gracias por tu paciencia y comprensión mientras trabajamos para resolver este problema.'
          actionFunc={() => refetch()}
          actionTextButton='Reintentar'
        />
      )}
      {isLoading && <PlayListSkeleton />}
      {!isError && !isLoading && playLists && (
        <div className='flex flex-row flex-wrap gap-2'>
          {playLists?.map((item) => <PlayListCard key={item.id} {...item} />)}
        </div>
      )}
    </div>
  )
}

export default PlayListComponent
