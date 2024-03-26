import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoutes from './routes/renderRoutes'
import { FullScreen } from './shared/components/loaders'
import Layout from './shared/Layout'

const App = () => {
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
