import { Test, TestingModule } from '@nestjs/testing';
import { MatchRelations } from '../database/constants';
import { GetMatchesResDto } from './dto';
import { MatchController } from './match.controller';
import { DaysHasMatches, MatchService } from './match.service';

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [],
    })
      .useMocker((token) => {
        switch (token) {
          case MatchService:
            return {
              findAllWithCount: () => ({
                total: 0,
                items: [],
              }),
              daysHasMatches: () => [],
            };
          default:
            return {};
        }
      })
      .compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Get matchs by time', async () => {
    const expectedResult: GetMatchesResDto = {
      total: 10,
      items: [
        {
          awayTeam: {
            id: 1,
            name: 'Chelsea',
          },
          status: 'FT',
          awayTeamScore: 0,
          date: new Date(2022, 11, 26),
          id: 2,
          homeTeam: {
            id: 2,
            name: 'Arsenal',
          },
          homeTeamScore: 0,
        },
      ],
    };
    jest.spyOn(service, 'findAllWithCount').mockResolvedValue(expectedResult);
    const fromDate = new Date(2022, 11, 26);
    const toDate = new Date(2022, 11, 27);

    const r = await controller.getMatches({
      fromDate: (fromDate.getTime() / 1000).toString(),
      toDate: (toDate.getTime() / 1000).toString(),
      limit: '15',
      page: '1',
    });

    expect(r).toEqual(expectedResult);
    expect(service.findAllWithCount).toHaveBeenCalledTimes(1);
    expect(service.findAllWithCount).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 15,
        take: 15,
        relations: [MatchRelations.awayTeam, MatchRelations.homeTeam],
        order: {
          date: 'ASC',
        },
        where: {
          date: expect.objectContaining({
            _value: [fromDate, toDate],
          }),
        },
      }),
    );
  });

  it('Get count match by day', async () => {
    const expectedResult: DaysHasMatches[] = [
      {
        count: 1,
        date: new Date(2022, 11, 26),
      },
      {
        count: 4,
        date: new Date(2022, 11, 27),
      },
    ];
    jest.spyOn(service, 'daysHasMatches').mockResolvedValue(expectedResult);
    const fromDate = new Date(2022, 11, 26);
    const toDate = new Date(2022, 11, 27);

    const r = await controller.countMatchByDays({
      fromDate: (fromDate.getTime() / 1000).toString(),
      toDate: (toDate.getTime() / 1000).toString(),
    });

    expect(r).toBe(expectedResult);
    expect(service.daysHasMatches).toHaveBeenCalledTimes(1);
    expect(service.daysHasMatches).toHaveBeenCalledWith(fromDate, toDate);
  });
});
