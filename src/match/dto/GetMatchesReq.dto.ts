import { IsNumberString, IsOptional } from 'class-validator';

export class GetMatchesReqDto {
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsNumberString()
  fromDate: string;

  @IsNumberString()
  toDate: string;
}
