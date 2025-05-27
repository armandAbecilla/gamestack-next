import { GameListItem } from './interfaces';

export type FancySelectOption = {
  label: string;
  value: string | number;
  classNames: string;
};

// for normal <select>
export type SelectOption = { label: string; value: string | number };

export type GameDataResponse = {
  games: GameListItem[];
  count: number;
};

export type GameListFilters = {
  title?: string;
  status?: string;
};
