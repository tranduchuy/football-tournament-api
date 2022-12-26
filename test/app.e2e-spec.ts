import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MatchModule } from '../src/match/match.module';
import { MatchService } from '../src/match/match.service';

describe('MatchController (e2e)', () => {
  let app: INestApplication;

  const matchService = {
    findAllWithCount: () =>
      Promise.resolve({
        total: 10,
        items: [
          {
            awayTeam: {
              id: 1,
              name: 'Chelsea',
            },
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
      }),
    daysHasMatches: () => {
      return [
        {
          count: 1,
          date: new Date(2022, 11, 26),
        },
        {
          count: 4,
          date: new Date(2022, 11, 27),
        },
      ];
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MatchModule],
    })
      .overrideProvider(MatchService)
      .useValue(matchService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/match (GET)', () => {
    return request(app.getHttpServer())
      .get('/match')
      .query({
        fromDate: '1671987600',
        toDate: '1672073940',
      })
      .expect(200)
      .expect(
        '{"total":10,"items":[{"awayTeam":{"id":1,"name":"Chelsea"},"awayTeamScore":0,"date":"2022-12-25T17:00:00.000Z","id":2,"homeTeam":{"id":2,"name":"Arsenal"},"homeTeamScore":0}]}',
      );
  });

  it('/match/count (GET)', () => {
    return request(app.getHttpServer())
      .get('/match/count')
      .query({
        fromDate: '1671987600',
        toDate: '1672073940',
      })
      .expect(200)
      .expect(
        '[{"count":1,"date":"2022-12-25T17:00:00.000Z"},{"count":4,"date":"2022-12-26T17:00:00.000Z"}]',
      );
  });
});
