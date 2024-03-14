import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoutes from './routes/renderRoutes'
/* import { useGetAll } from '@/shared/hooks' */

const App = () => {
  /* const { data } = useGetAll({
    getAllProps: {
      endPoint: `https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n`,
    },
    key: 'LIST_CLIENTS',
  })
  console.log({ data }) */

  return (
    <Suspense fallback={<>LOADING</>}>
      <Router>
        <RenderRoutes />
      </Router>
    </Suspense>
  )
}

export default App
