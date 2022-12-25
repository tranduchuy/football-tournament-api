import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { IMatch, MatchEntity } from 'src/database/entities';

export class GetMatchesResDto {
  @ApiProperty()
  total: number;

  @ApiProperty({
    type: [MatchEntity]
  })
  items: IMatch[];
}
