import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { PlayerBar, Volume } from './types/player'
import { PlayList, Song } from './modules/PlayList/types'

type CurrentMusic = { playList?: PlayList; songs?: Song[]; song?: Song }

/* useAppStore */

interface BaseState {
  isFullScreen: boolean
  volumeControl: Volume
  playerBarControl: PlayerBar
  currentMusic?: CurrentMusic
}

interface State extends BaseState {
  setCurrentMusic: (currentMusic: CurrentMusic) => void
}

const initialValues: BaseState = {
  isFullScreen: false,
  volumeControl: {
    initialValue: 25,
    max: 100,
    min: 0,
    lastVolume: undefined,
    isMute: false,
  },
  playerBarControl: {
    initialValue: 0,
    max: 100,
    min: 0,
    isPlaying: false,
  },
  currentMusic: undefined,
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

export const useAppStore = create<State>()(
  devtools((set) => {
    return {
      ...initialValues,
      setCurrentMusic: (currentMusic) => {
        set({
          currentMusic,
        })
      },
    }
  }),
)

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
