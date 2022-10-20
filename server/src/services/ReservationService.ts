import ReservationRepositroy from '../repositories/ReservationRepository';
import RouteRepository from '../repositories/RouteRepository';
import TripRepository from '../repositories/TripRepository';

export default class ReservationService {
  reservationRepositroy: ReservationRepositroy = new ReservationRepositroy();

  tripRepositroy: TripRepository = new TripRepository();

  routeRepositroy: RouteRepository = new RouteRepository();

  routeDistance = 100;

  sessionTimeout = 2;

  public startReservation = async (reservation: any) => {
    // check if sears are unique
    const requestedSeats = reservation.passengers.map((passenger: any) => passenger.seat);
    if (requestedSeats.length !== new Set(requestedSeats).size) {
      throw new Error('cannot reserve the same set multiple times');
    }
    const route = await this.routeRepositroy.getRoute(reservation.pickup, reservation.destination);
    console.log('route:', route);
    if (route === null) {
      throw new Error('route does not exist');
    }
    // get today's trip
    let trip = await this.tripRepositroy.getTrip(route.id, new Date().toLocaleDateString());
    console.log('trip found:', trip);
    if (trip === null) {
      // choose a bus
      const busId = route.distance >= this.routeDistance ? 1 : 2;
      // create a new trip
      trip = await this.tripRepositroy.createTrip(route.id, busId, new Date().toLocaleDateString());
      console.log('trip created:', trip);
    } else {
      // check reservation availability
      const lastReservation = await this.reservationRepositroy.getLastReservation(trip.id);
      console.log('lastReservation: ', lastReservation);
      const lastReservationTime = Date.parse(lastReservation!.reservationtime);
      console.log('lastReservationTime: ', lastReservationTime);
      const date = Date.parse(new Date().toLocaleString());
      console.log('date diff: ', date - lastReservationTime);

      if (!lastReservation?.confirmed && (date - lastReservationTime) / 60000 < this.sessionTimeout) {
        throw Error('Another reservation is in progress, please try again later');
      }
      // check seat availability
      const seatReservations = await this.reservationRepositroy.getReservations(trip.id, [], requestedSeats, true);
      console.log('reservedSeats:', seatReservations);
      if (seatReservations.length > 0) {
        throw Error('one or more seats already reserved');
      }
    }

    // reserve seats
    const createdReservation = await this.reservationRepositroy.createReservations(trip.id, reservation.passengers, new Date().toLocaleString());
    console.log('createdReservation:', createdReservation);

    return createdReservation;
  };

  public confirmReservations = async ({ reservations }: any) => {
    const applicableReservations = await this.reservationRepositroy.getReservations(undefined, reservations, [], false);
    const date = Date.parse(new Date().toLocaleString());
    applicableReservations.forEach(reservation => {
      if ((date - Date.parse(reservation.reservationtime)) / 60000 > this.sessionTimeout) {
        throw Error('Reservation is no longer valid, please try again');
      }
    });
    console.log('applicableReservations: ', applicableReservations);
    return this.reservationRepositroy.confirmReservation(reservations);
  };

  public getFrequentReservations = async () => {
    return this.reservationRepositroy.getFrequentReservations();
  };
}