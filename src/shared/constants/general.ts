import minLogo from '@/assets/logos/min.svg'
import favoriteImg from '@/assets/favorite.webp'
import grayImg from '@/assets/gray.webp'
import pxfuelImg from '@/assets/pxfuel.webp'
import { PlayList } from '@/modules/PlayList/types'
export const BASE_URL_API: string = import.meta.env.VITE_WORKER_URL

export const FAKE_DELAY_ROUTER = 2000
export const PLAY_LIST_COUNT = 20

export const MIN_LOGO = minLogo
export const GRAY_IMG = grayImg

export const FAVORITE_PLAY_LIST: PlayList = {
  cover: favoriteImg,
  fullCover: pxfuelImg,
  id: 'FAVORITE_KEY_ID',
  name: 'Mis favoritos',
  songs: [],
}
