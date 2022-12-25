import {
  BaseEntity,
  Column,
  Entity,
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

  @OneToOne(() => TeamEntity, { eager: true })
  homeTeam: TeamEntity;

  @Column({
    name: 'away_team_id',
    nullable: false,
    type: 'int',
  })
  awayTeamId: number;

  @OneToOne(() => TeamEntity, { eager: true })
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
    type: 'date',
    nullable: false,
  })
  date: Date;
}
