import express from 'express';
import tripRouter from './TripRouter';
import reservationRouter from './ReservationRouter';
import routeRouter from './RouteRouter';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/trip',
    route: tripRouter,
  },
  {
    path: '/reservation',
    route: reservationRouter,
  },
  {
    path: '/route',
    route: routeRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;