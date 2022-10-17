import { Entity, Column, ManyToOne, OneToMany, Relation, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import Bus from './Bus'
import Reservation from './Reservation'
import Route from './Route'

@Entity()
export default class Trip {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Bus, (bus) => bus.trips)
    @JoinColumn({ name: "bus_id" })
    bus: Relation<Bus>

    @ManyToOne(() => Route, (route) => route.trips)
    @JoinColumn({ name: "route_id" })
    route: Relation<Route>

    @OneToMany(() => Reservation, (reservation) => reservation.trip)
    reservations: Relation<Reservation[]>

    @Column()
    date!: string
}