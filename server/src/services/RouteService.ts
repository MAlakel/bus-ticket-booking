import RouteRepository from '../repositories/RouteRepository';

export default class RouteService {
  routeRepositroy: RouteRepository = new RouteRepository();

  public getRoutes = async () => {
    return this.routeRepositroy.getRoutes();
  };
}