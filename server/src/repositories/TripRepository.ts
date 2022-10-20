import AppDataSource from '../db/data-source';
import Bus from '../entities/Bus';
import Route from '../entities/Route';
import Trip from '../entities/Trip';

export default class TripRepository {
  tripDBRepository = AppDataSource.getRepository(Trip);

  public getTrips = (date: string) => {
    return this.tripDBRepository.find({ relations: { route: true, bus: true, reservations: true }, where: { date: date, reservations: { confirmed: true } } });
  };

  public getTrip = (routeId: number, date: string) => {
    return this.tripDBRepository.findOne({ relations: ['reservations'], where: { date: date, route: { id: routeId } } });
  };

  public createTrip = async (routeId: number, busId: number, date: string) => {
    const trip = new Trip();
    trip.route = new Route();
    trip.bus = new Bus();
    trip.bus.id = busId;
    trip.route.id = routeId;
    trip.date = date;
    const createdTrip = this.tripDBRepository.create(trip);
    return this.tripDBRepository.save(createdTrip);
  };
}
