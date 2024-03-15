import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoutes from './routes/renderRoutes'
import { useGetAll } from '@/shared/hooks'

const App = () => {
  const { data } = useGetAll({
    getAllProps: {},
    key: 'LIST_CLIENTS',
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
