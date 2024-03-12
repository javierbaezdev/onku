import { PATHS } from '@/modules/player/paths';
import { Navigate } from 'react-router-dom';
import playerRoutes from '@/modules/player/router';
/* import { NotFound } from '@/shared/pages' */

const generalsRoutes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    element: () => <Navigate to={`/${PATHS.BASE_MODULE.CLI}`} />,
  },
  /* {
    path: '*',
    key: 'all',
    element: () => <Navigate to='404' />,
  }, */
  /* {
    path: '404',
    key: '404',
    element: () => <NotFound />,
  }, */
];

const routes = [...generalsRoutes, ...playerRoutes];

export default routes;
