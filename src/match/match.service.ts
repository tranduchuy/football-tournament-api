import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMatch, MatchEntity } from 'src/database/entities';
import { FindManyOptions, Repository } from 'typeorm';

type Pagination<T> = {
  items: T[];
  total: number;
};

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchEntity)
    private matchRepo: Repository<MatchEntity>,
  ) {}

  async findAll(condition: FindManyOptions<MatchEntity>): Promise<IMatch[]> {
    return this.matchRepo.find(condition);
  }

  async findAllWithCount(
    condition: FindManyOptions<MatchEntity>,
  ): Promise<Pagination<MatchEntity>> {
    const [items, total] = await this.matchRepo.findAndCount(condition);

    return {
      items,
      total,
    };
  }
}
