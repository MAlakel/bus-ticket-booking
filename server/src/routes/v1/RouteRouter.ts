import express from "express";
import RouteController from '../../controllers/RouteController'

const routeRouter = express.Router();
const routeController = new RouteController();

routeRouter
    .route('/')
    .get(routeController.getRoutes)

export default routeRouter;