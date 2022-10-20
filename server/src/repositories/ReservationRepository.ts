import { In } from 'typeorm';
import AppDataSource from '../db/data-source';
import Reservation from '../entities/Reservation';
import Trip from '../entities/Trip';
import Crypto from 'crypto';

export default class ReservationRepository {
  public getReservations = (tripId: number | undefined, requestedReservations: string[], requestedSeats: string[], confirmed: boolean) => {
    const reservationRepository = AppDataSource.getRepository(Reservation);
    return reservationRepository.find({
      where: {
        confirmed: confirmed,
        ...(requestedReservations && requestedReservations.length > 0 && { id: In(requestedReservations) }),
        ...(tripId && { trip: { id: tripId } }),
        ...(requestedSeats && requestedSeats.length > 0 && { seat: { id: In(requestedSeats) } }),
      },
    });
  };

  public createReservations = async (tripId: number, passengers: any, time: string) => {
    const reservationRepository = AppDataSource.getRepository(Reservation);
    const reservations: Reservation[] = [];
    let discount = false;
    if (passengers.length > 5) {
      discount = true;
    }
    console.log('passengers:', passengers);
    passengers.forEach((passenger: any) => {
      const reservation = new Reservation();
      reservation.id = Crypto.randomBytes(32).toString('base64').slice(0, 32);
      reservation.email = passenger.email;
      reservation.seat = passenger.seat;
      reservation.discount = discount;
      reservation.reservationtime = time;
      reservation.trip = new Trip();
      reservation.trip.id = tripId;
      reservations.push(reservation);
    });
    console.log('reservations:', reservations);
    const createdReservations = reservationRepository.create(reservations);
    return reservationRepository.save(createdReservations);
  };

  public getLastReservation = async (tripId: number) => {
    const reservationRepository = AppDataSource.getRepository(Reservation);
    return reservationRepository.findOne({
      where: {
        trip: { id: tripId },
      }, order: { reservationtime: 'DESC' },
    });
  };

  public confirmReservation = async (reservationIds: any) => {
    const reservationRepository = AppDataSource.getRepository(Reservation);
    const reservations = await reservationRepository.find({
      where: {
        id: In(reservationIds),
      },
    });
    reservations.forEach((reservation: any) => reservation.confirmed = true);
    return reservationRepository.save(reservations);
  };

  public getFrequentReservations = async () => {
    const countQuery = AppDataSource.getRepository(Reservation).createQueryBuilder('reservation')
      .innerJoin('reservation.trip', 'trip')
      .innerJoin('trip.route', 'route')
      .innerJoin('route.pickup', 'pickup')
      .innerJoin('route.destination', 'destination')
      .select(['reservation.email as email', 'route.id as routeid', 'count(*) as routecount', 'pickup.city as pickup', 'destination.city as destination'])
      .where('reservation.confirmed = true')
      .groupBy('reservation.email')
      .addGroupBy('route.id')
      .addGroupBy('pickup.city')
      .addGroupBy('destination.city')
      .getQuery();

    const maxQuery = AppDataSource.createQueryBuilder()
      .select(['sq.email', 'max(sq.routecount) maxroutecount'])
      .from((subQuery) => {
        return subQuery
          .from(Reservation, "reservation")
          .innerJoin('reservation.trip', 'trip')
          .innerJoin('trip.route', 'route')
          .select(['reservation.email as email', 'route.id as routeid', 'count(*) as routecount'])
          .where('reservation.confirmed = true')
          .groupBy('reservation.email')
          .addGroupBy('route.id')
      }, 'sq')
      .groupBy('sq.email')
      .getQuery();

    return await AppDataSource.createQueryBuilder()
      .select(['q.email', 'q.routecount as bookings', 'q.pickup', 'q.destination'])
      .from("(" + countQuery + ")", "q")
      .innerJoin("(" + maxQuery + ")", "mq", "q.email = mq.email and q.routecount = mq.maxroutecount")
      .getRawMany();
  };
}
