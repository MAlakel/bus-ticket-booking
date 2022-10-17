import express, { Express } from 'express';
import './config';
import 'reflect-metadata';
import ApiError from './utils/ApiError';
import httpStatus from 'http-status';
import routes from './routes/v1';
import errorHandler from './middlewares/errorHandler';
import errorConverter from './middlewares/errorConverter';

const app: Express = express();
const port = process.env.PORT;

// parse json request body
app.use(express.json());

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running test at https://localhost:${port}`);
});