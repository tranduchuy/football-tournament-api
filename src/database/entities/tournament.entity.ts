import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base';
import { ITeam, TeamEntity } from './team.entity';

export interface ITournament {
  id: number;
  name: string;
  teams?: ITeam[];
}

@Entity({
  name: 'tournaments',
})
export class TournamentEntity extends BaseEntity implements ITournament {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({
    name: 'name',
  })
  @ApiProperty()
  name: string;

  @OneToMany(() => TeamEntity, (team) => team.tournament, { eager: false })
  @ApiProperty()
  teams?: TeamEntity[];
}
