import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from 'typeorm';
import { MatchEntity } from './match.entity';
import { ITournament, TournamentEntity } from './tournament.entity';

export interface ITeam {
  id: number;
  name: string;
  tournament?: ITournament;
}

@Entity({
  name: 'teams',
})
export class TeamEntity extends BaseEntity implements ITeam {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  @ApiProperty()
  name: string;

  @OneToMany(() => MatchEntity, (match) => match.homeTeam, { eager: false })
  homeMatches: MatchEntity[];

  @OneToMany(() => MatchEntity, (match) => match.awayTeam, { eager: false })
  awayMatches: MatchEntity[];

  @ManyToOne(() => TournamentEntity, (tour) => tour.teams, { eager: false })
  @JoinColumn({ name: 'tournament_id' })
  tournament?: TournamentEntity;
}
