import { Marquee } from '@/shared/components'
import { MIN_LOGO } from '@/shared/constants/general'
import { Heart } from '@/shared/icons'
import { useAppPersistStore, useAppStore } from '@/store'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Song = () => {
  const currentMusic = useAppStore((store) => store.currentMusic)
  const { favoritesSongsIds, addNewFavoriteId, deleteFavoriteId } =
    useAppPersistStore((store) => store)

  const handleFavoriteSong = (songId: string) => {
    if (favoritesSongsIds.includes(songId)) {
      deleteFavoriteId(songId)
    } else {
      addNewFavoriteId(songId)
    }
  }

  return (
    <div className='flex flex-row items-center gap-2'>
      <div className='flex min-w-[60%] max-w-[60%] flex-row gap-4 overflow-hidden'>
        <img
          className={twMerge(
            clsx('aspect-square rounded-md', {
              'border border-carissma-200/50 p-2': !currentMusic?.song?.cover,
            }),
          )}
          width={60}
          height={60}
          loading='eager'
          src={currentMusic?.song?.cover || MIN_LOGO}
        />
        <div className='flex flex-col gap-2'>
          <Marquee className='text-sm' classNameContainer=''>
            {currentMusic?.song?.name || ''}
          </Marquee>
          <span className='line-clamp-1 text-xs text-cod-gray-400'>
            {currentMusic?.playList?.name || ''}
          </span>
        </div>
      </div>
      {currentMusic?.song && (
        <div className=' mb-auto pt-2'>
          <Heart
            onClick={() => handleFavoriteSong(currentMusic?.song?.id || '')}
            className={twMerge(
              clsx(
                'inline-block cursor-pointer text-cod-gray-400 hover:scale-110',
                {
                  'animate-tada text-carissma-600': favoritesSongsIds.includes(
                    currentMusic?.song.id,
                  ),
                },
              ),
            )}
          />
        </div>
      )}
    </div>
  )
}

export default Song
