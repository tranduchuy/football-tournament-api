import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetMatchesReqDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'number of items should be responsed',
    required: false,
    default: 10,
  })
  limit?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'get items at page',
    required: false,
    default: 0,
  })
  page?: string;

  @IsNumberString()
  @ApiProperty({
    description: 'from datetime in unix (without miliseconds). Eg. 1671987600',
    default: 1671987600,
  })
  fromDate: string;

  @IsNumberString()
  @ApiProperty({
    description: 'to datetime in unix (without miliseconds). Eg. 1672073940',
    default: 1672073940,
  })
  toDate: string;

  @IsEnum(SortDirection)
  @ApiProperty({
    description: 'direction should be sorted with `date` property',
    enum: SortDirection,
    default: 'ASC',
  })
  sortDirection?: SortDirection;
}
