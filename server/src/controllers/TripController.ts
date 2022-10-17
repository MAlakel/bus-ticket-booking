import { Request, Response } from 'express';
import TripService from '../services/TripService';
import catchAsync from '../utils/CatchAsync';

export default class TripController {
  tripService: TripService = new TripService();

  public getTrips = catchAsync(async (req: Request, res: Response) => {
    const trips = await this.tripService.getTrips();
    res.send(trips);
  });
}