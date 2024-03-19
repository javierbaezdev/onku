import { PATHS } from '@/modules/PlayList/paths'
import { FavoriteSongListCard } from '@/shared/components'
import { Home, Library } from '@/shared/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const Aside = () => {
  const location = useLocation()
  const navigate = useNavigate()

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

        <div className='flex flex-row gap-6 rounded-t-md bg-cod-gray-950 p-6  pb-6 text-cod-gray-300'>
          <Library />
          <h3 className='text-md'>Tus favoritos</h3>
        </div>
      </div>

      <div className='content-pages mb-2 ml-4 mr-2 flex h-full flex-col gap-4 overflow-hidden bg-cod-gray-950  hover:overflow-auto '>
        <FavoriteSongListCard />
      </div>
    </div>
  )
}

export default Aside
