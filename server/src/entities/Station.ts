import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm'
import Route from './Route'

@Entity()
export default class Station {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    city!: string

    @OneToMany(() => Route, (route) => route.pickup)
    pickupRoutes: Relation<Route[]>

    @OneToMany(() => Route, (route) => route.destination)
    destinationRoutes: Relation<Route[]>
}