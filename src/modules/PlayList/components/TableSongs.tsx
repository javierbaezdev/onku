import { Alert, FavoriteSongListCard } from '@/shared/components'
import { Heart } from '@/shared/icons'
import { Song } from '../types'
import { useAppPersistStore } from '@/store'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import { DurationSong } from '.'

interface Props {
  songs?: Song[]
}

const TableSongs = ({ songs }: Props) => {
  const { favoritesSongsIds, addNewFavoriteId, deleteFavoriteId } =
    useAppPersistStore((store) => store)
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
                {index + 1}
              </td>
              <td className='max-w-44 pl-4'>
                <FavoriteSongListCard
                  cover={song.cover}
                  name={song.name}
                  playListName=''
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
