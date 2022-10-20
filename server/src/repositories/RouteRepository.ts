import AppDataSource from '../db/data-source';
import Route from '../entities/Route';

export default class RouteRepository {
  routeDBRepository = AppDataSource.getRepository(Route);

  public getRoutes = () => {
    return this.routeDBRepository.find({ relations: { pickup: true, destination: true } });
  };

  public getRoute = (pickupId: number, destinationId: number) => {
    return this.routeDBRepository.findOne({ where: { pickup: { id: pickupId }, destination: { id: destinationId } } });
  };
}
