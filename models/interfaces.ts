export interface GameData {
  platforms: any[];
  developers: { name: string }[];
  background_image: string;
  name: string;
  released: string;
  metacritic: string | number | null;
  description: string;
}

export interface UserGameData {
  id: number;
  created_at: string;
  status?: string;
  notes: string;
  user_id: string;
  rawg_game_id: number;
  rawg_game_title: string;
}

// for GameList
export interface GameListItem {
  id: number;
  name: string;
  background_image: string;
}

// export interface SearchResultItem {}
