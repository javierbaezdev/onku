const img_test =
  'https://images.sftcdn.net/images/t_app-icon-s/p/7528ab68-b2b0-484d-9310-51bc2ee4d1f7/286660403/anime-avatar-maker-2-4cu-logo'

const Song = () => {
  return (
    <div className='flex flex-row items-center gap-4'>
      <img
        className='aspect-square rounded-md'
        width={60}
        height={60}
        loading='lazy'
        src={img_test}
      />
      <div className='flex flex-col gap-2'>
        <h3 className='line-clamp-1 text-sm text-cod-gray-200'>
          episode018「野生動物(N3)」
        </h3>
        <span className='line-clamp-1 text-xs text-cod-gray-400'>
          Let’s Talk in Japanese!
        </span>
      </div>
    </div>
  )
}

export default Song
