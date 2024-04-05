import { twMerge } from 'tailwind-merge'
import Aside from './components/Aside'
import Player from './components/Player'
import clsx from 'clsx'
import { useAppStore } from '@/store'
import { BasicButton } from '../components/buttons'
import { Close, Heart } from '../icons'
import { useOpen } from '../hooks'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  const currentMusic = useAppStore((store) => store.currentMusic)
  const { isOpen, onToggle } = useOpen()
  return (
    <div className='relative h-screen w-screen bg-black p-2 font-bold text-white'>
      <div
        className={twMerge(
          clsx('flex h-full w-full flex-row gap-2 md:h-[calc(100%_-_5rem)]', {
            'h-[calc(100%_-_5rem)]': currentMusic?.song,
          }),
        )}
      >
        {/* md */}
        <aside className='hidden md:block md:min-w-[320px] md:max-w-[320px]'>
          <Aside />
        </aside>

        {/* sm */}
        <aside
          className={twMerge(
            clsx('hidden h-screen w-screen overflow-hidden p-2', {
              'fixed left-0 top-0 z-40 block': isOpen,
              'h-[calc(100%_-_5rem)]': isOpen && currentMusic?.song,
            }),
          )}
        >
          <Aside />
        </aside>

        <BasicButton
          onClick={onToggle}
          className='fixed right-3 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-cod-gray-400/70 p-2 hover:animate-tada md:hidden'
        >
          {isOpen ? (
            <Close className='animate-rotate-360' />
          ) : (
            <Heart className='text-carissma-100' />
          )}
        </BasicButton>
        <main className='content-pages w-full overflow-hidden rounded-md bg-gradient-to-b from-carissma-950/50 to-cod-gray-950 p-2 md:w-full md:overflow-y-auto md:overflow-x-hidden'>
          {children}
        </main>
      </div>
      <footer
        className={twMerge(
          clsx(
            'absolute bottom-0 left-0 right-0 z-50 hidden h-20 rounded-sm bg-black px-4 md:block',
            { block: currentMusic?.song },
          ),
        )}
      >
        <Player />
      </footer>
    </div>
  )
}

export default Layout
