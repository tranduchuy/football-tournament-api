import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ITeam, TeamEntity } from './team.entity';

export interface IMatch {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  date: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  homeTeam: ITeam;
  awayTeam: ITeam;
}

@Entity({
  name: 'matches',
})
export class MatchEntity extends BaseEntity implements IMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'home_team_id',
    nullable: false,
    type: 'int',
  })
  homeTeamId: number;

  @Column({
    name: 'home_team_score',
    nullable: false,
    type: 'int',
    default: 0,
  })
  homeTeamScore: number;

  @ManyToOne(() => TeamEntity, (team) => team.homeMatches, { eager: true })
  @JoinColumn({ name: 'home_team_id' })
  homeTeam: TeamEntity;

  @Column({
    name: 'away_team_id',
    nullable: false,
    type: 'int',
  })
  awayTeamId: number;

  @ManyToOne(() => TeamEntity, (team) => team.awayMatches, { eager: true })
  @JoinColumn({ name: 'away_team_id' })
  awayTeam: TeamEntity;

  @Column({
    name: 'away_team_score',
    nullable: false,
    type: 'int',
    default: 0,
  })
  awayTeamScore: number;

  @Column({
    name: 'date',
    type: 'timestamp',
    nullable: false,
  })
  date: Date;
}
