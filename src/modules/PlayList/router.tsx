import { lazy } from 'react'
import { PATHS } from './paths'

const PlayList = lazy(async () => await import('./pages/PlayList'))
const PlayListDetails = lazy(
  async () => await import('./pages/PlayListDetails'),
)

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
