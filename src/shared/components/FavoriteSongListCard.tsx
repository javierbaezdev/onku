const img_test =
  'https://images.sftcdn.net/images/t_app-icon-s/p/7528ab68-b2b0-484d-9310-51bc2ee4d1f7/286660403/anime-avatar-maker-2-4cu-logo'

const FavoriteSongListCard = () => {
  return (
    <div className='flex flex-row gap-2'>
      <div className='w-16'>
        <img
          className=' aspect-square rounded-md'
          width={50}
          height={50}
          src={img_test}
          loading='lazy'
        />
      </div>
      <div className='flex flex-col gap-2 '>
        <h3 className='line-clamp-1 text-sm text-cod-gray-200'>
          日本語 with あこ - Nihongo Picnic Podcast -
        </h3>
        <h4 className='line-clamp-1 text-xs text-cod-gray-400'>日本語</h4>
      </div>
    </div>
  )
}

export default FavoriteSongListCard
