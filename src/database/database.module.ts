import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEntity } from './entities/match.entity';
import { TeamEntity } from './entities/team.entity';
import { TournamentEntity } from './entities/tournament.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'hometest',
      entities: [TournamentEntity, TeamEntity, MatchEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
