import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Between } from 'typeorm';
import { GetDaysHasMatchReqDto } from './dto/GetDaysHasMatchesReq.dto';
import { GetDaysHasMatchResDto } from './dto/GetDaysHasMatchesRes.dto';
import { GetMatchesReqDto } from './dto/GetMatchesReq.dto';
import { GetMatchesResDto } from './dto/GetMatchesRes.dto';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get()
  @ApiOkResponse({
    type: GetMatchesResDto,
  })
  async getMatches(
    @Query() query: GetMatchesReqDto,
  ): Promise<GetMatchesResDto> {
    const limit = parseInt(query.limit || '10', 10);
    const page = parseInt(query.page || '0', 10);
    const fromDate = parseInt(query.fromDate, 10);
    const toDate = parseInt(query.toDate, 10);

    const data = await this.matchService.findAllWithCount({
      skip: page * limit,
      take: limit,
      where: {
        date: Between(new Date(fromDate * 1000), new Date(toDate * 1000)),
      },
      relations: ['homeTeam', 'awayTeam'],
      order: {
        date: 'ASC',
      },
    });

    return data;
  }

  @Get('/count')
  @ApiOkResponse({
    type: [GetDaysHasMatchResDto],
  })
  async countMatchByDays(@Query() query: GetDaysHasMatchReqDto) {
    const fromDate = parseInt(query.fromDate, 10);
    const toDate = parseInt(query.toDate, 10);

    const items = await this.matchService.daysHasMatches(
      new Date(fromDate * 1000),
      new Date(toDate * 1000),
    );

    return items;
  }
}
