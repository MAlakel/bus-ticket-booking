import ReservationRepositroy from '../repositories/ReservationRepository';
import RouteRepository from '../repositories/RouteRepository';

export default class RouteService {
  reservationRepositroy: ReservationRepositroy = new ReservationRepositroy();

  routeRepositroy: RouteRepository = new RouteRepository();

  public getRoutes = async () => {
    const availableRoutes = await this.routeRepositroy.getRoutes();
    console.log('availableRoutes: ', availableRoutes);
    return this.routeRepositroy.getRoutes();
  };
}