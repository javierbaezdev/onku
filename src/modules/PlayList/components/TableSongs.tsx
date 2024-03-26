import { Alert } from '@/shared/components'
import { Heart, Pause, Play } from '@/shared/icons'
import { Song } from '../types'
import { useAppPersistStore, useAppStore } from '@/store'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import { DurationSong, SongCard } from '.'

interface Props {
  songs?: Song[]
  playListToStore: (indexSong?: number) => void
}

const TableSongs = ({ songs }: Props) => {
  const { favoritesSongsIds, addNewFavoriteId, deleteFavoriteId } =
    useAppPersistStore((store) => store)

  const { currentMusic, playerBarControl, setPause, setPlay } = useAppStore(
    (store) => store,
  )

  if (!songs) {
    return <Alert msg='¡La listas de reproducción esta vacía!' />
  }

  const handleFavoriteSong = (songId: string) => {
    if (favoritesSongsIds.includes(songId)) {
      deleteFavoriteId(songId)
    } else {
      addNewFavoriteId(songId)
    }
  }

  const renderPlayPauseOrIndex = (songId: string, index: number) => {
    if (currentMusic?.song?.id !== songId) {
      return index + 1
    }

    if (currentMusic?.song?.id === songId && playerBarControl.isPlaying) {
      return (
        <Pause
          width={14}
          height={14}
          className='cursor-pointer text-carissma-600 hover:scale-110'
          onClick={() => setPause()}
        />
      )
    }
    if (currentMusic?.song?.id === songId && !playerBarControl.isPlaying) {
      return (
        <Play
          width={14}
          height={14}
          className='cursor-pointer text-carissma-600 hover:scale-110'
          onClick={() => setPlay()}
        />
      )
    }
  }

  return (
    <div className='content-pages relative animate-fade-in overflow-x-auto text-cod-gray-400 animate-delay-300'>
      <table className='w-full text-left text-sm rtl:text-right'>
        <thead className='text-xs uppercase '>
          <tr>
            <th scope='col' className='px-6 py-3 text-sm font-bold md:w-3'>
              #
            </th>
            <th scope='col' className='px-6 py-3'>
              Título
            </th>
            <th scope='col' className='px-6 py-3'>
              Duración
            </th>
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>

        <tbody>
          {songs?.map((song, index) => (
            <tr key={song.id}>
              <td scope='row' className='px-6 py-6'>
                {renderPlayPauseOrIndex(song.id, index)}
              </td>
              <td className='max-w-44 pl-4'>
                <SongCard
                  cover={song.cover}
                  name={song.name}
                  playListName=''
                  classNameMarquee={
                    currentMusic?.song?.id === song.id &&
                    playerBarControl.isPlaying
                      ? 'text-carissma-600'
                      : undefined
                  }
                />
              </td>
              <td className='px-6 py-6'>
                <DurationSong urlSong={song.url} />
              </td>
              <td className='px-6 py-6'>
                <Heart
                  onClick={() => handleFavoriteSong(song.id)}
                  className={twMerge(
                    clsx('cursor-pointer text-cod-gray-400 hover:scale-110', {
                      'animate-tada text-carissma-600':
                        favoritesSongsIds.includes(song.id),
                    }),
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableSongs
