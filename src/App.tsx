import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RenderRoutes from './routes/renderRoutes';

const App = () => {
  return (
    <Suspense fallback={<>LOADING</>}>
      <Router>
        <RenderRoutes />
      </Router>
    </Suspense>
  );
};

export default App;
