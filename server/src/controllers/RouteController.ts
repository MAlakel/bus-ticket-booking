import { Request, Response } from 'express';
import RouteService from '../services/RouteService';
import catchAsync from '../utils/CatchAsync';

export default class RouteController {
  routeService: RouteService = new RouteService();

  public getRoutes = catchAsync(async (req: Request, res: Response) => {
    const routes = await this.routeService.getRoutes();
    res.send(routes);
  });
}