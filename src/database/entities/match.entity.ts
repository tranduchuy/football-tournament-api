import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ITeam, TeamEntity } from './team.entity';

export interface IMatch {
  id: number;
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'home_team_score',
    nullable: false,
    type: 'int',
    default: 0,
  })
  @ApiProperty()
  homeTeamScore: number;

  @ManyToOne(() => TeamEntity, (team) => team.homeMatches, { eager: true })
  @JoinColumn({ name: 'home_team_id' })
  @ApiProperty()
  homeTeam: TeamEntity;

  @ManyToOne(() => TeamEntity, (team) => team.awayMatches, { eager: true })
  @JoinColumn({ name: 'away_team_id' })
  @ApiProperty()
  awayTeam: TeamEntity;

  @Column({
    name: 'away_team_score',
    nullable: false,
    type: 'int',
    default: 0,
  })
  @ApiProperty()
  awayTeamScore: number;

  @Column({
    name: 'date',
    type: 'timestamp',
    nullable: false,
  })
  @ApiProperty()
  date: Date;
}
