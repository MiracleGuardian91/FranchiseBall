import Dashboard from "../pages/Dashboard";
import PlayerPool from '../pages/PlayerPool';
import Lottery from "../pages/Lottery";

const coreRoutes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/players',
    component: PlayerPool
  },
  {
    path: '/lottery',
    component: Lottery
  }
];

const routes = [...coreRoutes];
export default routes;