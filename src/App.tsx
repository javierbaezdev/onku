import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoutes from './routes/renderRoutes'
import { useGetAll } from '@/shared/hooks'
import { PATHS } from './modules/PlayList/paths'

const App = () => {
  const { data } = useGetAll({
    getAllProps: {
      endPoint: PATHS.PLAY_LISTS.API,
    },
    key: PATHS.PLAY_LISTS.KEY,
  })
  console.log({ data })

  return (
    <Suspense fallback={<>LOADING</>}>
      <Router>
        <RenderRoutes />
      </Router>
    </Suspense>
  )
}

export default App
