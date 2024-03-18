import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoutes from './routes/renderRoutes'
import { FullScreen } from './shared/components/loaders'

const App = () => {
  return (
    <Suspense fallback={<FullScreen />}>
      <Router>
        <RenderRoutes />
      </Router>
    </Suspense>
  )
}

export default App
