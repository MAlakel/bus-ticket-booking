import AppDataSource from "../db/data-source";
import Route from "../entities/Route";

export default class RouteRepository {
  routeRepository = AppDataSource.getRepository(Route);

  public getRoutes = () => {
    return this.routeRepository.find({ relations: {} });
  }

  getRoute(pickupId: number, destinationId: number) {
    return this.routeRepository.findOne({ where: { pickup: { id: pickupId }, destination: { id: destinationId } } });
  }

  constructor() {
  }
}
