import { lazy } from 'react';
import { PATHS } from './paths';
import { FAKE_DELAY_ROUTER } from '@/shared/constants/general';

const Player = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_ROUTER));
  return import('./pages/Player');
});

const routes = [
  {
    path: `/${PATHS.BASE_MODULE.CLI}`,
    key: PATHS.BASE_MODULE.KEY,
    exact: true,
    element: () => <Player />,
  },
];

export default routes;
