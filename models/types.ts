import { GameListItem } from './interfaces';

export type TimeUnit =
  | 'this_week'
  | 'last_30_days'
  | 'this_month'
  | 'this_year';

export type Status = 'playing' | 'completed' | 'backlog' | 'wishlist';

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
  status?: Status | '';
  timeUnit?: TimeUnit | '';
};

export type TimeUnitOption = {
  label: string;
  value: TimeUnit;
};

export type NewGameData = {
  userId: string;
  rawgGameId: string;
  rawgGameTitle: string;
  status: string;
  notes: string;
};
