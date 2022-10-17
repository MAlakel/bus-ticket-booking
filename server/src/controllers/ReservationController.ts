import { Request, Response } from 'express';
import ReservationService from '../services/ReservationService';
import catchAsync from '../utils/CatchAsync';

export default class ReservationController {
  reservationService: ReservationService = new ReservationService();

  public startReservation = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
    const reservations = await this.reservationService.startReservation(req.body);
    res.send(reservations);
  });

  public confirmReservations = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
    const reservations = await this.reservationService.confirmReservations(req.body);
    res.send(reservations);
  });

  public getFrequentReservations = catchAsync(async (req: Request, res: Response) => {
    const trips = await this.reservationService.getFrequentReservations();
    res.send(trips);
  });
}