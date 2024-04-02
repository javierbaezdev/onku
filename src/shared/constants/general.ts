import minLogo from '@/assets/logos/min.svg'
import favoriteImg from '@/assets/favorite.webp'
import { PlayList } from '@/modules/PlayList/types'
export const BASE_URL_API: string = import.meta.env.VITE_WORKER_URL

export const FAKE_DELAY_ROUTER = 2000
export const PLAY_LIST_COUNT = 20

export const MIN_LOGO = minLogo

export const FAVORITE_PLAY_LIST: PlayList = {
  cover: favoriteImg,
  fullCover: '',
  id: 'FAVORITE_KEY_ID',
  name: 'Mis favoritos',
  songs: [],
}
