import { Alert } from '@/shared/components'
import { Heart, Pause, Play } from '@/shared/icons'
import { Song } from '../types'
import { useAppPersistStore, useAppStore } from '@/store'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import { DurationSong, SongCard } from '.'
import { useState } from 'react'

interface Props {
  songs?: Song[]
  playListToStore: (indexSong?: number) => void
}

interface RenderPlayOrPause {
  isPlay: boolean
  indexSong?: number
  usingSimplePlay?: boolean
}

const TableSongs = ({ songs, playListToStore }: Props) => {
  const [isHover, setIsHover] = useState(false)
  const [currentHoverIndex, setCurrentHoverIndex] = useState<number | null>(
    null,
  )
  const { favoritesSongsIds, addNewFavoriteId, deleteFavoriteId } =
    useAppPersistStore((store) => store)

  const {
    currentMusic,
    playerBarControl,
    setPause,
    setPlay,
    deleteFavoriteSong,
  } = useAppStore((store) => store)

  if (!songs) {
    return <Alert msg='¡La listas de reproducción esta vacía!' />
  }

  const handleFavoriteSong = (songId: string) => {
    if (favoritesSongsIds.includes(songId)) {
      deleteFavoriteId(songId)
      deleteFavoriteSong(songId)
    } else {
      addNewFavoriteId(songId)
    }
  }

  const handlePlay = (indexSong?: number) => {
    playListToStore(indexSong)
    setPlay()
  }

  const renderPlayOrPause = ({
    isPlay,
    indexSong,
    usingSimplePlay,
  }: RenderPlayOrPause): JSX.Element => {
    if (isPlay) {
      return (
        <Play
          width={14}
          height={14}
          className='cursor-pointer text-carissma-600 hover:scale-110'
          onClick={() => (!usingSimplePlay ? handlePlay(indexSong) : setPlay())}
        />
      )
    } else {
      return (
        <Pause
          width={14}
          height={14}
          className='cursor-pointer text-carissma-600 hover:scale-110'
          onClick={() => setPause()}
        />
      )
    }
  }

  const renderPlayPauseOrIndex = (songId: string, index: number) => {
    if (currentMusic?.song?.id !== songId) {
      return (
        <div>
          {isHover && currentHoverIndex === index ? (
            renderPlayOrPause({ isPlay: true, indexSong: index })
          ) : (
            <p>{index + 1}</p>
          )}
        </div>
      )
    }

    if (currentMusic?.song?.id === songId && playerBarControl.isPlaying) {
      return renderPlayOrPause({ isPlay: false })
    }
    if (currentMusic?.song?.id === songId && !playerBarControl.isPlaying) {
      return renderPlayOrPause({ isPlay: true, usingSimplePlay: true })
    }
  }

  return (
    <div className='content-pages relative animate-fade-in overflow-x-auto text-cod-gray-400 animate-delay-300'>
      <table className='w-full text-left text-sm rtl:text-right'>
        <thead className='hidden text-xs uppercase md:contents'>
          <tr>
            <th scope='col' className='px-6 py-3 text-sm font-bold  md:w-3'>
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
              <td
                scope='row'
                className='py- max-h-8 min-h-8 min-w-8 max-w-8 px-6'
                onMouseEnter={() => {
                  setIsHover(true)
                  setCurrentHoverIndex(index)
                }}
                onMouseLeave={() => {
                  setIsHover(false)
                  setCurrentHoverIndex(null)
                }}
              >
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
              <td className='hidden px-6 py-6 md:flex'>
                <DurationSong urlSong={song.url} />
              </td>
              <td className='flex justify-end px-6 py-6 md:table-cell'>
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
