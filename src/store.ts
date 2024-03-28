import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { PlayerBar, Volume } from './types/player'
import { Favorite, PlayList, Song } from './modules/PlayList/types'

type CurrentMusic = {
  playList?: PlayList
  songs?: Song[]
  song?: Song
  songsAlreadyHeardIds?: string[]
  favoriteSongs?: Favorite[]
}

/* useAppStore */

interface BaseState {
  isFullScreen: boolean
  volumeControl: Volume
  playerBarControl: PlayerBar
  currentMusic: CurrentMusic
}

interface State extends BaseState {
  setCurrentMusic: (currentMusic: CurrentMusic) => void
  setPlay: () => void
  setPause: () => void
  setVolume: (newVolume: number, setLastVolume?: boolean) => void
  setCurrentTime: (newCurrentTime: number) => void
  onNextSong: () => void
  onPreviewSong: () => void
  setFullScreen: (isFull: boolean) => void
}

const initialValues: BaseState = {
  isFullScreen: false,
  volumeControl: {
    initialValue: 0.25,
    max: 100,
    min: 0,
    lastVolume: undefined,
    isMute: false,
    value: undefined,
  },
  playerBarControl: {
    initialValue: 0,
    max: 100,
    min: 0,
    isPlaying: false,
    currentTime: 0,
    isRandom: false,
    isLoop: false,
  },
  currentMusic: {
    favoriteSongs: [],
    playList: undefined,
    songs: undefined,
    song: undefined,
    songsAlreadyHeardIds: [],
  },
}

/* ------------------------------------------------------------------------- */

/* useAppPersistStore */

interface BaseStatePersist {
  favoritesSongsIds: string[]
}

interface StatePersist extends BaseStatePersist {
  addNewFavoriteId: (id: string) => void
  deleteFavoriteId: (id: string) => void
}

const initialValuesPersist: BaseStatePersist = {
  favoritesSongsIds: [],
}

/* ------------------------------------------------------------------------- */

export const useAppStore = create<State>((set, get) => ({
  ...initialValues,
  setCurrentMusic: (newCurrentMusic) => {
    const { currentMusic } = get()
    set({
      currentMusic: { ...currentMusic, ...newCurrentMusic },
    })
  },
  setPlay: () => {
    const { playerBarControl } = get()
    set({
      playerBarControl: { ...playerBarControl, isPlaying: true },
    })
  },
  setPause: () => {
    const { playerBarControl } = get()
    set({
      playerBarControl: { ...playerBarControl, isPlaying: false },
    })
  },
  setVolume: (newVolume, setLastVolume) => {
    const { volumeControl } = get()
    set({
      volumeControl: {
        ...volumeControl,
        value: newVolume,
        lastVolume: setLastVolume ? volumeControl.value : undefined,
      },
    })
  },
  setCurrentTime: (newCurrentTime) => {
    const { playerBarControl } = get()
    set({
      playerBarControl: { ...playerBarControl, currentTime: newCurrentTime },
    })
  },
  onNextSong: () => {
    const { playerBarControl, currentMusic } = get()

    if (currentMusic?.songs && currentMusic?.song) {
      const indexSong = currentMusic.songs.findIndex(
        (song) => song.id === currentMusic?.song?.id,
      )
      const nextSong = currentMusic.songs[indexSong + 1]

      if (nextSong) {
        set({
          currentMusic: { ...currentMusic, song: nextSong },
        })
      }
      if (!nextSong) {
        set({
          playerBarControl: {
            ...playerBarControl,
            isPlaying: false,
            currentTime: 0,
          },
        })
      }
    }
  },
  onPreviewSong: () => {
    const { playerBarControl, currentMusic } = get()

    if (currentMusic?.songs && currentMusic?.song) {
      const indexSong = currentMusic.songs.findIndex(
        (song) => song.id === currentMusic?.song?.id,
      )
      const previewSong = currentMusic.songs[indexSong - 1]

      if (previewSong) {
        set({
          currentMusic: { ...currentMusic, song: previewSong },
        })
      }
      if (!previewSong) {
        set({
          playerBarControl: {
            ...playerBarControl,
            isPlaying: false,
            currentTime: 0,
          },
        })
      }
    }
  },
  setFullScreen: (isFull) => {
    set({
      isFullScreen: isFull,
    })
  },
}))

export const useAppPersistStore = create<StatePersist>()(
  devtools(
    persist(
      (set, get) => {
        return {
          ...initialValuesPersist,
          addNewFavoriteId: (id) => {
            const { favoritesSongsIds } = get()

            set({
              favoritesSongsIds: [id, ...favoritesSongsIds],
            })
          },
          deleteFavoriteId: (id) => {
            const { favoritesSongsIds } = get()

            const newValues = favoritesSongsIds.filter((item) => item !== id)

            set({
              favoritesSongsIds: newValues,
            })
          },
        }
      },
      {
        name: 'onkuStore',
      },
    ),
  ),
)
