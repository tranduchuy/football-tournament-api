import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base';

@Entity({
  name: 'tournaments',
})
export class TournamentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
  })
  name: string;
}
