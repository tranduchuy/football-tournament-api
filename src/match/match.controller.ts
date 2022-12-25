import { Controller, Get, Query } from '@nestjs/common';
import { IMatch } from 'src/database/entities';
import { In, Between } from 'typeorm';
import { GetMatchesReqDto } from './dto/GetMatchesReq.dto';
import { GetMatchesResDto } from './dto/GetMatchesRes.dto';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get()
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
}
