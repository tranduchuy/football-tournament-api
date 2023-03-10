import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from '../constants/env';
import * as path from 'path';
import { MatchEntity } from './entities/match.entity';
import { TeamEntity } from './entities/team.entity';
import { TournamentEntity } from './entities/tournament.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Env.DB_HOST,
      port: Env.DB_PORT,
      username: Env.DB_USER,
      password: Env.DB_PASSWORD,
      database: Env.DB_NAME,
      entities: [TournamentEntity, TeamEntity, MatchEntity],
      migrations: [path.join(__dirname, 'migrations/**.ts')],
      synchronize: false,
      logging: true,
      timezone: 'Z',
    }),
  ],
})
export class DatabaseModule {}
