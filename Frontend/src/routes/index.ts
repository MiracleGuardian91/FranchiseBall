import Dashboard from "../pages/Dashboard";
import PlayerPool from '../pages/PlayerPool';
import Lottery from "../pages/Lottery";
import Draft from "../pages/Draft";

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
  },
  {
    path: '/draft',
    component: Draft
  }
];

const routes = [...coreRoutes];
export default routes;