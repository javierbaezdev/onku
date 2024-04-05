import { lazy } from 'react'
import { PATHS } from './paths'
import { FAKE_DELAY_ROUTER } from '@/shared/constants/general'

const PlayList = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_ROUTER))
  return import('./pages/PlayList')
})

const PlayListDetails = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_ROUTER))
  return import('./pages/PlayListDetails')
})

const routes = [
  {
    path: `/${PATHS.PLAY_LISTS.CLI}`,
    key: PATHS.PLAY_LISTS.KEY,
    exact: true,
    element: () => <PlayList />,
  },
  {
    path: `/${PATHS.PLAY_LISTS.CLI}/${PATHS.PLAY_LISTS_DETAILS.CLI}/:playListId`,
    key: PATHS.PLAY_LISTS_DETAILS.KEY,
    exact: true,
    element: () => <PlayListDetails />,
  },
]

export default routes
