import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetDaysHasMatchReqDto {
  @IsNumberString()
  @ApiProperty({
    description: 'from datetime in unix (without miliseconds). Eg. 1671987600',
  })
  fromDate: string;

  @IsNumberString()
  @ApiProperty({
    description: 'to datetime in unix (without miliseconds). Eg. 1672073940',
  })
  toDate: string;
}
