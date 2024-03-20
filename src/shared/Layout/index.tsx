import Aside from './components/Aside'
import Player from './components/Player'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <div className='relative h-screen w-screen bg-black p-2 font-bold text-white'>
      <div className='flex h-[calc(100%_-_5rem)] w-full flex-row gap-2'>
        <aside className='max-w-xs'>
          <Aside />
        </aside>
        <main className='content-pages overflow-hidden rounded-md bg-gradient-to-b from-carissma-950/50 to-cod-gray-950 p-2 md:w-full md:overflow-y-auto md:overflow-x-hidden'>
          {children}
        </main>
      </div>
      <footer className='absolute bottom-0 left-0 right-0 h-20 rounded-sm bg-black px-4'>
        <Player />
      </footer>
    </div>
  )
}

export default Layout
