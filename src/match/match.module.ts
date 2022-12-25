import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MatchEntity])],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
