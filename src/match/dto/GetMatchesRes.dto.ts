import { ApiProperty } from '@nestjs/swagger';
import { IMatch, MatchEntity } from '../../database/entities';

export class GetMatchesResDto {
  @ApiProperty()
  total: number;

  @ApiProperty({
    type: [MatchEntity],
  })
  items: IMatch[];
}
