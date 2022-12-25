import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMatch, MatchEntity } from 'src/database/entities';
import { FindManyOptions, getManager, Repository } from 'typeorm';

export type Pagination<T> = {
  items: T[];
  total: number;
};

export type DaysHasMatches = {
  date: Date; //
  count: number; // number of match in this day
};

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchEntity)
    private matchRepo: Repository<MatchEntity>,
  ) {
    this.daysHasMatches(new Date(2022, 11, 27), new Date(2022, 11, 28, 1)).then(
      (items) => console.log(items),
    );
  }

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

  async daysHasMatches(
    fromDate: Date,
    toDate: Date,
  ): Promise<DaysHasMatches[]> {
    const manager = getManager();
    const items: any[] = await manager.query(
      `SELECT DATE(date) as date, count(*) as count from matches where date between ? and ? GROUP BY DATE(date)`,
      [fromDate, toDate],
    );

    return items.map((item) => {
      return {
        date: item.date,
        count: parseInt(item.count, 10),
      };
    });
  }
}
