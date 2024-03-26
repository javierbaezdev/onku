import { PATHS } from '@/modules/PlayList/paths'
import { Favorite } from '@/modules/PlayList/types'
import { Alert, FavoriteSongListCard } from '@/shared/components'
import { Min01 } from '@/shared/components/loaders'
import { useGetAll } from '@/shared/hooks'
import { Home, Library } from '@/shared/icons'
import { useAppPersistStore } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

const Aside = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const favoritesSongsIds = useAppPersistStore(
    (store) => store.favoritesSongsIds,
  )

  const {
    data: favorites,
    isLoading,
    isError,
  } = useGetAll<Favorite[], Favorite[]>({
    getAllProps: {
      endPoint: PATHS.FAVORITES.API,
      queries: { songsIds: JSON.stringify(favoritesSongsIds) },
    },
    key: PATHS.FAVORITES.KEY,
  })

  const goHome = () => {
    if (location.pathname !== `/${PATHS.PLAY_LISTS}`) {
      navigate('/play-lists')
    }
  }
  return (
    <div className='flex h-full flex-col rounded-b-md bg-cod-gray-950'>
      <div className='flex flex-col gap-2 bg-black'>
        <div className=' flex flex-row items-center gap-2 rounded-md bg-cod-gray-950 p-6  text-cod-gray-300'>
          <Home />
          <a className='text-md cursor-pointer ' onClick={goHome}>
            Inicio
          </a>
        </div>

        <div className='flex flex-row justify-between rounded-t-md bg-cod-gray-950 p-6  pb-6 text-cod-gray-300'>
          <div className='flex flex-row gap-2'>
            <Library />
            <h3 className='text-md'>Tus favoritos</h3>
          </div>

          {isLoading && <Min01 />}
        </div>
      </div>

      <div className='content-pages mb-2 ml-4 mr-2 flex h-full flex-col gap-4 overflow-hidden bg-cod-gray-950 hover:overflow-y-auto'>
        {isLoading && isError && (
          <Alert msg='¡Lista de favoritos no disponible!' />
        )}

        {favorites?.length === 0 && (
          <Alert msg='¡Lista de favoritos está vacía!' />
        )}
        {favorites?.map(({ cover, name, playList }) => (
          <FavoriteSongListCard
            cover={cover}
            name={name}
            playListName={playList.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Aside
