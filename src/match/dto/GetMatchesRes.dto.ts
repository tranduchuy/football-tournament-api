import { IMatch } from 'src/database/entities';

export type GetMatchesResDto = {
  total: number;
  items: IMatch[];
};
