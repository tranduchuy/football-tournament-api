import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';
import { MatchEntity } from './match.entity';
import { TournamentEntity } from './tournament.entity';

@Entity({
  name: 'teams',
})
export class TeamEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @OneToMany(() => MatchEntity, (match) => match.homeTeam, { eager: false })
  homeMatches: MatchEntity[];

  @OneToMany(() => MatchEntity, (match) => match.awayTeam, { eager: false })
  awayMatches: MatchEntity[];

  @ManyToOne(() => TournamentEntity, (tour) => tour.teams, {eager: false})
  tournament: TournamentEntity;
}