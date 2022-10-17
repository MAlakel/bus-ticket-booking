import express from "express";
import ReservationController from '../../controllers/ReservationController'

const reservationRouter = express.Router();
const reservationController = new ReservationController();

reservationRouter
    .route('/start')
    .put(reservationController.startReservation);

reservationRouter
    .route('/confirm')
    .post(reservationController.confirmReservations);

export default reservationRouter;