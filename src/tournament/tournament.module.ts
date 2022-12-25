import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from 'src/database/entities';
import { TournamentService } from './tournament.service';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity])],
  providers: [TournamentService],
})
export class TournamentModule {}
