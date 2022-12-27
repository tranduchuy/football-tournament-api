import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { MatchRelations } from '../database/constants';
import { Between } from 'typeorm';
import {
  GetDaysHasMatchReqDto,
  GetDaysHasMatchResDto,
  GetMatchesReqDto,
  GetMatchesResDto,
} from './dto';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get('/')
  @ApiOkResponse({
    type: GetMatchesResDto,
  })
  async getMatches(
    @Query() query: GetMatchesReqDto,
  ): Promise<GetMatchesResDto> {
    // parse value from query (string) to number
    const limit = parseInt(query.limit || '10', 10);
    const page = parseInt(query.page || '0', 10);
    const fromDate = parseInt(query.fromDate, 10);
    const toDate = parseInt(query.toDate, 10);
    const { sortDirection } = query;

    const data = await this.matchService.findAllWithCount({
      skip: page * limit,
      take: limit,
      where: {
        // convert unix to miliseconds (x * 1000)
        date: Between(new Date(fromDate * 1000), new Date(toDate * 1000)),
      },
      relations: [MatchRelations.awayTeam, MatchRelations.homeTeam], // eager load team entites
      order: {
        date: sortDirection || 'ASC',
      },
    });

    return data;
  }

  @Get('/count')
  @ApiOkResponse({
    type: [GetDaysHasMatchResDto],
  })
  async countMatchByDays(@Query() query: GetDaysHasMatchReqDto) {
    // parse value from query (string) to number
    const fromDate = parseInt(query.fromDate, 10);
    const toDate = parseInt(query.toDate, 10);

    const items = await this.matchService.daysHasMatches(
      new Date(fromDate * 1000),
      new Date(toDate * 1000),
    );

    return items;
  }
}
