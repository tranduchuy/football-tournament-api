import { ApiProperty } from '@nestjs/swagger';

export class GetDaysHasMatchResDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  count: number;
}
