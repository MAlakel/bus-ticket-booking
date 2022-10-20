import ReservationRepositroy from '../repositories/ReservationRepository';
import TripRepository from '../repositories/TripRepository';

export default class TripService {
  reservationRepositroy: ReservationRepositroy = new ReservationRepositroy();

  tripRepositroy: TripRepository = new TripRepository();

  public getTrips = async () => {
    return this.tripRepositroy.getTrips(new Date().toLocaleDateString());
  };
}