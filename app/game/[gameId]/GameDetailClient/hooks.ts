// this hooks are specifically for GameDetailClient component

import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';

import queryClient from '@/lib/api';
<<<<<<< Updated upstream
=======
import {
  addSession,
  getGameSessions,
  updateSession,
} from '@/lib/api/game-sessions';
>>>>>>> Stashed changes
import {
  addGameToList,
  fetchGameDetails,
  fetchUserGameDetail,
  removeGameFromList,
  updateUserGameData,
} from '@/lib/api/games';
import { GameData } from '@/models/interfaces';

type UseOptimisticUpdatingOptions<
  TData,
  TError,
  TVariables,
  TContext extends { prevData?: TData },
> = UseMutationOptions<TData, TError, TVariables, TContext>;

const useOptimisticUpdating = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext extends { prevData?: TData } = { prevData?: TData },
>(
  queryKey: QueryKey,
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseOptimisticUpdatingOptions<
    TData,
    TError,
    TVariables,
    TContext
  > = {},
) => {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    onMutate: async (newData: TVariables) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<TData>(queryKey);

      queryClient.setQueryData<TData>(queryKey, newData as unknown as TData);

      return { prevData } as TContext;
    },
    onError: (error, variables, context) => {
      if (context?.prevData !== undefined) {
        queryClient.setQueryData(queryKey, context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    ...options,
  });
};

export const useGameDetail = (id: string) => {
  return useQuery<GameData>({
    queryKey: ['selectedGame', id],
    queryFn: ({ signal }) => {
      return fetchGameDetails({ signal, gameId: id });
    },
  });
};

export const useUserGameData = (id: string, userId: string | undefined) => {
  const userGameKey = ['userGame', id, userId]; // keys for queryKey
  return useQuery({
    queryKey: userGameKey,
    queryFn: ({ signal }) => {
      return fetchUserGameDetail({
        signal,
        userId: userId ? userId : '',
        gameId: id,
      });
    },
    enabled: !!userId,
  });
};

export const useMutateAddToLibrary = (userGameKey: QueryKey) => {
  return useOptimisticUpdating(userGameKey, addGameToList, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
      queryClient.invalidateQueries({
        queryKey: ['stats'], // invalidate the stats in homepage
      });
    },
  });
};

export const useMutateRemoveFromLibrary = (userGameKey: QueryKey) => {
  return useOptimisticUpdating(userGameKey, removeGameFromList, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stats'], // invalidate the stats in homepage
      });
    },
  });
};

export const useMutateUpdateUserGameData = (userGameKey: QueryKey) => {
  return useOptimisticUpdating(userGameKey, updateUserGameData, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stats'], // invalidate the stats in homepage
      });
    },
  });
};
<<<<<<< Updated upstream
=======

export const useGetGameSessions = (gameId: string, userId: string) => {
  const gameSessionKey = ['game-sessions', gameId, userId];
  return useQuery({
    queryKey: gameSessionKey,
    queryFn: ({ signal }) => getGameSessions({ signal, gameId, userId }),
    enabled: !!userId,
  });
};

export const useMutateAddSession = (gameId: string, userId: string) => {
  const gameSessionKey = ['game-sessions', gameId, userId];
  return useOptimisticUpdating(gameSessionKey, addSession, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: gameSessionKey,
      });
    },
  });
};

export const useMutateUpdateSession = (gameId: string, userId: string) => {
  const gameSessionKey = ['game-sessions', gameId, userId];
  return useOptimisticUpdating(gameSessionKey, updateSession, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: gameSessionKey,
      });
    },
  });
};
>>>>>>> Stashed changes
