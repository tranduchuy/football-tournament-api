import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { TournamentModule } from './tournament/tournament.module';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [DatabaseModule, TournamentModule, TeamModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
