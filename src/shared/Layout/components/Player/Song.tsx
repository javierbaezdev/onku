import { Image, Marquee } from '@/shared/components'
import { MIN_LOGO } from '@/shared/constants/general'
import { Heart } from '@/shared/icons'
import { useAppPersistStore, useAppStore } from '@/store'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Song = () => {
  const { currentMusic, deleteFavoriteSong } = useAppStore((store) => store)
  const { favoritesSongsIds, addNewFavoriteId, deleteFavoriteId } =
    useAppPersistStore((store) => store)

  const handleFavoriteSong = (songId: string) => {
    if (favoritesSongsIds.includes(songId)) {
      deleteFavoriteId(songId)
      deleteFavoriteSong(songId)
    } else {
      addNewFavoriteId(songId)
    }
  }

  return (
    <>
      {currentMusic?.song && (
        <div className='flex animate-zoom-in flex-row items-center gap-2'>
          <div className='ms:min-w-full flex flex-row gap-4 overflow-hidden sm:max-w-full md:min-w-[55%] md:max-w-[55%]'>
            <Image
              className='aspect-square rounded-md'
              width='60px'
              height='60px'
              src={currentMusic?.song?.cover || MIN_LOGO}
            />
            <div className=' hidden flex-col gap-2 md:flex'>
              <Marquee className='text-sm' classNameContainer=''>
                {currentMusic?.song?.name || ''}
              </Marquee>
              <span className='line-clamp-1 text-xs text-cod-gray-400'>
                {currentMusic?.playList?.name || ''}
              </span>
            </div>
          </div>

          <div className=' mb-auto hidden pt-2 md:block'>
            <Heart
              onClick={() => handleFavoriteSong(currentMusic?.song?.id || '')}
              className={twMerge(
                clsx(
                  'inline-block cursor-pointer text-cod-gray-400 hover:scale-110',
                  {
                    'animate-tada text-carissma-600':
                      favoritesSongsIds.includes(currentMusic?.song.id),
                  },
                ),
              )}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Song
