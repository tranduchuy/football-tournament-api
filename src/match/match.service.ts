import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/constants/type';
import { IMatch, MatchEntity } from 'src/database/entities';
import { FindManyOptions, getManager, Repository } from 'typeorm';

export type DaysHasMatches = {
  date: Date;
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

  /**
   * Get list of match with pagination
   * @param condition query condition
   * @returns Promise<Pagination<MatchEntity>>
   */
  async findAllWithCount(
    condition: FindManyOptions<MatchEntity>,
  ): Promise<Pagination<MatchEntity>> {
    const [items, total] = await this.matchRepo.findAndCount(condition);

    return {
      items,
      total,
    };
  }

  /**
   * Count number of match each day in range
   * @param fromDate Date
   * @param toDate Date
   * @returns Promise<DaysHasMatches[]>
   */
  async daysHasMatches(
    fromDate: Date,
    toDate: Date,
  ): Promise<DaysHasMatches[]> {
    // prepare querying with raw SQL
    const manager = getManager();
    // group matches by date (yyyy-mm-dd) and count number of records
    const items: any[] = await manager.query(
      `SELECT DATE(date) as date, count(*) as count from matches where date between ? and ? GROUP BY DATE(date)`,
      [fromDate, toDate],
    );

    return items.map((item) => {
      return {
        date: item.date,
        // the "count" value which is returned from above SQL is string, need to convert to integer
        count: parseInt(item.count, 10),
      };
    });
  }
}
