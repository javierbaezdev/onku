import Aside from './components/Aside'
import Player from './components/Player'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <div className='relative h-screen w-screen bg-black p-2 font-bold text-white'>
      <div className='flex h-[calc(100%_-_5rem)] w-full flex-row gap-2'>
        <aside className='rounded-md bg-cod-gray-950 p-2 md:w-4/12'>
          <Aside />
        </aside>
        <main className='from-carissma-950/50 rounded-md bg-gradient-to-b to-cod-gray-950 p-2 md:w-8/12'>
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
