import { BasicButton } from '@/shared/components/buttons'
import { useAppStore } from '@/store'

const FullPlayer = () => {
  const setFullScreen = useAppStore((store) => store.setFullScreen)

  return (
    <div className='fixed inset-0 z-[9000] flex h-screen w-screen animate-pulse-fade-in items-center justify-center bg-cod-gray-400'>
      <BasicButton
        className='bg-cod-gray-950'
        onClick={() => setFullScreen(false)}
      >
        exit
      </BasicButton>
    </div>
  )
}

export default FullPlayer
