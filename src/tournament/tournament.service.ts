import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(TournamentEntity)
    private readonly tournamentRepo: Repository<TournamentEntity>,
  ) {}
}
