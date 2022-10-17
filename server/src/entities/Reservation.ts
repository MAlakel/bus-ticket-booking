import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Relation } from 'typeorm'
import Trip from './Trip'
import Seat from './Seat'

@Entity()
export default class Reservation {
    @PrimaryColumn()
    id!: string

    @ManyToOne(() => Trip, (trip) => trip.reservations)
    @JoinColumn({ name: "trip_id" })
    trip: Relation<Trip>

    @ManyToOne(() => Seat, (seat) => seat.reservations)
    @JoinColumn({ name: "seat_id" })
    seat: Relation<Seat>

    @Column()
    email!: string

    @Column()
    discount!: boolean

    @Column()
    reservationtime!: string

    @Column()
    confirmed!: boolean
}