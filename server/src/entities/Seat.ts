import { Entity, PrimaryColumn, OneToMany, Relation } from 'typeorm';
import Reservation from './Reservation';

@Entity()
export default class Seat {
  @PrimaryColumn()
    id!: string;

  @OneToMany(() => Reservation, (reservation) => reservation.seat)
    reservations: Relation<Reservation[]>;
}