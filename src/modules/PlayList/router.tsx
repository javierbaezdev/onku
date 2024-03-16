import { lazy } from 'react'
import { PATHS } from './paths'
import { FAKE_DELAY_ROUTER } from '@/shared/constants/general'
import Layout from '@/shared/Layout'

const PlayList = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_ROUTER))
  return import('./pages/PlayList')
})

const routes = [
  {
    path: `/${PATHS.BASE_MODULE.CLI}`,
    key: PATHS.BASE_MODULE.KEY,
    exact: true,
    element: () => (
      <Layout>
        <PlayList />
      </Layout>
    ),
  },
]

export default routes
