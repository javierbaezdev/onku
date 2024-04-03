import minLogo from '@/assets/logos/min.svg'
import favoriteImg from '@/assets/favorite.webp'
import grayImg from '@/assets/gray.webp'
import pxfuelImg from '@/assets/pxfuel.webp'
import { PlayList } from '@/modules/PlayList/types'
import { useMediaQuery } from 'react-responsive'
export const BASE_URL_API: string = import.meta.env.VITE_WORKER_URL

export const FAKE_DELAY_ROUTER = 2000
export const PLAY_LIST_COUNT = 20

export const MIN_LOGO = minLogo
export const GRAY_IMG = grayImg

const BREAK_POINTS_SCREEN = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
}

export const GET_SIZE_SCREAM = () => {
  const isSm = useMediaQuery({
    query: `(max-width: ${BREAK_POINTS_SCREEN.SM})`,
  })
  const isMd = useMediaQuery({
    query: `(max-width: ${BREAK_POINTS_SCREEN.MD})`,
  })
  const isLg = useMediaQuery({
    query: `(max-width: ${BREAK_POINTS_SCREEN.LG})`,
  })
  const isXl = useMediaQuery({
    query: `(max-width: ${BREAK_POINTS_SCREEN.XL})`,
  })
  const is2Xl = useMediaQuery({
    query: `(max-width: ${BREAK_POINTS_SCREEN['2XL']})`,
  })

  return { isSm, isMd, isLg, isXl, is2Xl }
}

export const FAVORITE_PLAY_LIST: PlayList = {
  cover: favoriteImg,
  fullCover: pxfuelImg,
  id: 'FAVORITE_KEY_ID',
  name: 'Mis favoritos',
  songs: [],
}
