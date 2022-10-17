import { In } from "typeorm";
import AppDataSource from "../db/data-source";
import Reservation from "../entities/Reservation";
import Trip from "../entities/Trip";
import Crypto from 'crypto';

export default class ReservationRepository {
  public getReservations = (tripId: number, requestedSeats: string[]) => {
    const reservationRepository = AppDataSource.getRepository(Reservation);
    return reservationRepository.find({
      where: {
        trip: { id: tripId },
        confirmed: true,
        ...(requestedSeats.length > 0 && { seat: { id: In(requestedSeats) } })
      }
    });
  }

  public createReservations = async (tripId: number, passengers: any, time: string) => {
    const reservationRepository = AppDataSource.getRepository(Reservation);
    const reservations: Reservation[] = [];
    let discount = false;
    if (passengers.length > 5) {
      discount = true;
    }
    console.log('passengers:', passengers);
    passengers.forEach((passenger: any) => {
      const reservation = new Reservation()
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
    const createdReservations = await reservationRepository.create(reservations);
    return await reservationRepository.save(createdReservations);
  }

  public getLastReservation = async (tripId: number) => {
    const reservationRepository = AppDataSource.getRepository(Reservation);
    return reservationRepository.findOne({
      where: {
        trip: { id: tripId }
      }, order: { reservationtime: "DESC" }
    });
  }

  public confirmReservation = async (reservationIds: any) => {
    const reservationRepository = AppDataSource.getRepository(Reservation);
    const reservations = await reservationRepository.find({
      where: {
        id: In(reservationIds)
      }
    });
    reservations.forEach((reservation: any) => reservation.confirmed = true);
    return await reservationRepository.save(reservations);
  }

  constructor() {
  }
}
