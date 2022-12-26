import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEntity } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MatchEntity])],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
