import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base';
import { TeamEntity } from './team.entity';

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

  @OneToMany(() => TeamEntity, (team) => team.tournament, {eager: false})
  teams?: TeamEntity[];
}
