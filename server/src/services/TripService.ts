import ReservationRepositroy from '../repositories/ReservationRepository';
import RouteRepository from '../repositories/RouteRepository';
import TripRepository from '../repositories/TripRepository';

export default class TripService {
  reservationRepositroy: ReservationRepositroy = new ReservationRepositroy();

  tripRepositroy: TripRepository = new TripRepository();

  routeRepositroy: RouteRepository = new RouteRepository();

  public getTrips = async () => {
    return this.tripRepositroy.getTrips(new Date().toLocaleDateString());
  };
}