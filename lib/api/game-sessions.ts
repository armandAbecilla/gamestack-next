import axios from 'axios';

import projectConfig from '@/config/config';
import { GameSession } from '@/models/types';

export const getGameSessions = async ({
  signal,
  gameId,
  userId,
}: {
  signal?: AbortSignal;
  gameId: string;
  userId: string;
}) => {
  try {
    const response = await axios.get(
      `${projectConfig.API_URL}/game-session/${gameId}?userId=${userId}`,
      { signal: signal },
    );

    return response.data ?? null;
  } catch (e) {
    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message: e.message || 'Failed to fetch data.',
        }),
        { status: 500 },
      );
    } else {
      console.error('Unknown error:', e);
    }
  }
};

export const addSession = async ({
  signal,
  gameSessionData,
}: {
  signal?: AbortSignal;
  gameSessionData: GameSession;
}) => {
  try {
    const response = await axios.post(
      `${projectConfig.API_URL}/game-session/add`,
      gameSessionData,
      { signal: signal },
    );

    return response.data ?? null;
  } catch (e) {
    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message: e.message || 'Failed to add session.',
        }),
        { status: 500 },
      );
    } else {
      console.error('Unknown error:', e);
    }
  }
};

export const updateSession = async ({
  signal,
  id,
  updatedGameSessionData,
}: {
  signal?: AbortSignal;
  id: string;
  updatedGameSessionData: GameSession;
}) => {
  try {
    const response = await axios.patch(
      `${projectConfig.API_URL}/game-session/${id}`,
      updatedGameSessionData,
      { signal: signal },
    );

    return response.data ?? null;
  } catch (e) {
    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message: e.message || 'Failed to add session.',
        }),
        { status: 500 },
      );
    } else {
      console.error('Unknown error:', e);
    }
  }
};
