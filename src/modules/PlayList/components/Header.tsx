import { ArrowLeft } from '@/shared/icons'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../paths'

const Header = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(`/${PATHS.PLAY_LISTS.CLI}`)
  }

  return (
    <div className='flex flex-row px-2 py-2' onClick={() => goBack()}>
      <button className='flex h-10 w-10 items-center justify-center rounded-full bg-black/50 p-2 hover:scale-110'>
        <ArrowLeft />
      </button>
    </div>
  )
}

export default Header
