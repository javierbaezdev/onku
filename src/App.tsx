import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoutes from './routes/renderRoutes'
import { FullScreen } from './shared/components/loaders'
import Layout from './shared/Layout'
import { useAppStore } from './store'

const App = () => {
  const isFullScreen = useAppStore((store) => store.isFullScreen)

  useEffect(() => {
    if (isFullScreen) {
      document.documentElement.requestFullscreen()
    }
    if (document.exitFullscreen && !isFullScreen) {
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
