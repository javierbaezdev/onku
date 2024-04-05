import { FULL_LOGO } from '@/shared/constants/general'
import Image from '../../Image'
import './loader.css'

const FullScreen = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
      <div className='animate-pulsing opacity-40 animate-iteration-count-infinite'>
        <Image src={FULL_LOGO} width='200px' height='200px' />
      </div>
      <span className='loader ' />
    </div>
  )
}

export default FullScreen
