const Player = () => {
  return (
    <div className='relative h-screen w-screen bg-black p-2 font-bold text-white'>
      <div className='flex h-[calc(100%_-_6rem)] w-full flex-row gap-2'>
        <aside className='bg-cod-gray-950 rounded-md p-2 md:w-2/6'>aside</aside>
        <main className='bg-cod-gray-950 rounded-md p-2 md:w-4/6'>main</main>
      </div>
      <footer className='absolute bottom-0 left-0 right-0 h-24 rounded-sm bg-black p-2'>
        player
      </footer>
    </div>
  )
}

export default Player
