import { Image, Marquee } from '@/shared/components'
import { GET_SIZE_SCREAM, MIN_LOGO } from '@/shared/constants/general'
import { Heart } from '@/shared/icons'
import { useAppPersistStore, useAppStore } from '@/store'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Song = () => {
  const { isSm } = GET_SIZE_SCREAM()
  const { currentMusic, deleteFavoriteSong, setFullScreen, isFullScreen } =
    useAppStore((store) => store)
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

  const handleFullScreen = () => {
    if (!isFullScreen && isSm) {
      setFullScreen(true)
    }
  }

  return (
    <>
      {currentMusic?.song && (
        <div className='flex animate-zoom-in flex-row items-center gap-2 '>
          <div
            className='ms:min-w-full flex flex-row gap-4 overflow-hidden sm:max-w-full md:min-w-[55%] md:max-w-[55%]'
            onClick={handleFullScreen}
          >
            <Image
              className='aspect-square rounded-md'
              width='60px'
              height='60px'
              src={currentMusic?.song?.cover || MIN_LOGO}
            />
            <div className='flex flex-col gap-1 overflow-hidden sm:max-w-[50%]'>
              <Marquee className='text-sm' classNameContainer=''>
                {currentMusic?.song?.name || ''}
              </Marquee>
              <Marquee
                className='!mb-auto text-xs text-cod-gray-400'
                classNameContainer='md:max-h-5'
              >
                {currentMusic?.playList?.name || ''}
              </Marquee>
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
