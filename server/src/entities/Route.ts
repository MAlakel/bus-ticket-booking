import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation, ManyToOne, JoinColumn } from 'typeorm'
import Station from './Station'
import Trip from './Trip'

@Entity()
export default class Route {
    @PrimaryGeneratedColumn()
    id!: number

    // @Column()
    // pickup!: number

    // @Column()
    // destination!: number

    @Column()
    distance!: number

    @OneToMany(() => Trip, (trip) => trip.route)
    trips: Relation<Trip[]>

    @ManyToOne(() => Station, (station) => station.pickupRoutes)
    @JoinColumn({ name: "pickup" })
    pickup: Relation<Station>

    @ManyToOne(() => Station, (station) => station.destinationRoutes)
    @JoinColumn({ name: "destination" })
    destination: Relation<Station>
}