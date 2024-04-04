import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoutes from './routes/renderRoutes'
import { FullScreen } from './shared/components/loaders'
import Layout from './shared/Layout'
import { useAppStore } from './store'
import { GET_SIZE_SCREAM } from './shared/constants/general'

const App = () => {
  const isFullScreen = useAppStore((store) => store.isFullScreen)
  const { isSm } = GET_SIZE_SCREAM()

  useEffect(() => {
    if (isFullScreen && !isSm) {
      document.documentElement.requestFullscreen()
    }
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }, [isFullScreen])

  return (
    <Layout>
      <Suspense fallback={<FullScreen />}>
        <Router>
          <RenderRoutes />
        </Router>
      </Suspense>
    </Layout>
  )
}

export default App
