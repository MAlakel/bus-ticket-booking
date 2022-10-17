import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm'
import Trip from './Trip'

@Entity()
export default class Bus {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    type!: string

    @OneToMany(() => Trip, (trip) => trip.bus)
    trips: Relation<Trip[]>
}