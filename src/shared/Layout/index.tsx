import Aside from './components/Aside'
import Player from './components/Player'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <div className='relative h-screen w-screen bg-black p-2 font-bold text-white'>
      <div className='flex h-[calc(100%_-_6rem)] w-full flex-row gap-2'>
        <aside className='rounded-md bg-cod-gray-950 p-2 md:w-2/6'>
          <Aside />
        </aside>
        <main className='rounded-md bg-cod-gray-950 p-2 md:w-4/6'>
          {children}
        </main>
      </div>
      <footer className='absolute bottom-0 left-0 right-0 h-24 rounded-sm bg-black p-2'>
        <Player />
      </footer>
    </div>
  )
}

export default Layout
