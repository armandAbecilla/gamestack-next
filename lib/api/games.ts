import axios from 'axios';

import projectConfig from '@/config/config';
import { GameListFilters, NewGameData } from '@/models/types';

export const MAX_PAGE_SIZE = 24;

// Fetch user games from Supabase DB
export const fetchUserGames = async ({
  signal,
  userId,
  page,
  filters,
  limit = MAX_PAGE_SIZE,
}: {
  signal?: AbortSignal;
  userId: string;
  page: number;
  filters: GameListFilters | undefined;
  limit?: number;
}) => {
  try {
    let url = `${projectConfig.API_URL}/games/user/${userId}?page=${page}&limit=${limit}`;

    if (filters?.status) {
      url += '&status=' + filters.status;
    }

    if (filters?.title) {
      url += '&title=' + filters.title;
    }

    if (filters?.timeUnit) {
      url += '&filterByTimeUnit=' + filters.timeUnit;
    }

    const response = await axios.get(url, { signal: signal });
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message: e.message || 'Could not fetch user games',
        }),
        { status: 500 },
      );
    } else {
      console.error('Unknown error:', e);
    }
  }
};

// Fetch games by keyword from RAWG.io API
export const fetchGameByKeyword = async ({
  signal,
  searchTerm,
}: {
  signal?: AbortSignal;
  searchTerm: string;
}) => {
  console.log(searchTerm);
  const result = await axios.get(
    `${projectConfig.API_URL}/rawg/search?keyword=${searchTerm}`,
    { signal: signal },
  );

  return result.data.games;
};

export const fetchGameDetails = async ({
  signal,
  gameId,
  readOnly,
}: {
  signal?: AbortSignal;
  gameId: string;
  readOnly?: boolean;
}) => {
  const result = await axios.get(
    `${projectConfig.API_URL}/rawg/${gameId}${readOnly ? '?readOnly=true' : ''}`,
    {
      signal: signal,
    },
  );
  return result.data;
};

export const fetchUserGameDetail = async ({
  signal,
  gameId,
  userId,
}: {
  signal?: AbortSignal;
  gameId: string;
  userId: string;
}) => {
  const result = await axios.get(
    `${projectConfig.API_URL}/games/${gameId}?userId=${userId}`,
    { signal: signal },
  );

  return result?.data[0] ?? null;
};

// Create entries in Supabase DB
export const addGameToList = async ({
  signal,
  data,
}: {
  signal?: AbortSignal;
  data: NewGameData;
}) => {
  const result = await axios.post(`${projectConfig.API_URL}/games/add`, data, {
    signal: signal,
  });
  return result.data;
};

// Remove entry from SupabaseDB
export const removeGameFromList = async ({
  signal,
  id,
}: {
  signal?: AbortSignal;
  id: number;
}) => {
  await axios.delete(`${projectConfig.API_URL}/games/${id}`, {
    signal: signal,
  });
};

// Update entry from SupabaseDB
export const updateUserGameData = async ({
  signal,
  id,
  gameData,
}: {
  signal?: AbortSignal;
  id: string;
  gameData: any;
}) => {
  try {
    const response = await axios.patch(
      `${projectConfig.API_URL}/games/${id}`,
      gameData,
      { signal: signal },
    );

    return response.data ?? null;
  } catch (e) {
    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message: e.message || 'Failed to update data.',
        }),
        { status: 500 },
      );
    } else {
      console.error('Unknown error:', e);
    }
  }
};

export const getUserStats = async ({
  signal,
  id,
}: {
  signal: AbortSignal;
  id: string;
}) => {
  try {
    const response = await axios.get(
      `${projectConfig.API_URL}/games/user/${id}/stats`,
      { signal: signal },
    );

    return response.data ?? null;
  } catch (e) {
    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message: e.message || 'Failed to update data.',
        }),
        { status: 500 },
      );
    } else {
      console.error('Unknown error:', e);
    }
  }
};
