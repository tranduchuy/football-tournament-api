import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';

@Module({
  providers: [TournamentService]
})
export class TournamentModule {}
