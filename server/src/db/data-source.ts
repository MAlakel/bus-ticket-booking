import { DataSource } from 'typeorm'
import Station from '../entities/Station'
import Bus from '../entities/Bus'
import Route from '../entities/Route'
import Seat from '../entities/Seat'
import Trip from '../entities/Trip'
import Reservation from '../entities/Reservation'

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT!,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: true,
    entities: [Station, Bus, Trip, Route, Seat, Reservation],
    subscribers: [],
    migrations: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log('db connected');
    })
    .catch((error) => console.log(error))

export default AppDataSource;