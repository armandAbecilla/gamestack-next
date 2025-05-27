import projectConfig from '@/config/config';
import { GameListFilters } from '@/models/types';
import axios, { AxiosError } from 'axios';

export const MAX_PAGE_SIZE = 25;

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
}: {
  signal?: AbortSignal;
  gameId: string;
}) => {
  const result = await axios.get(`${projectConfig.API_URL}/rawg/${gameId}`, {
    signal: signal,
  });
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

type NewGameData = {
  string: any;
};

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
