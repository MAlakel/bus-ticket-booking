import express from 'express';
import TripController from '../../controllers/TripController';

const tripRouter = express.Router();
const tripController = new TripController();

tripRouter
  .route('/')
  .get(tripController.getTrips);

export default tripRouter;