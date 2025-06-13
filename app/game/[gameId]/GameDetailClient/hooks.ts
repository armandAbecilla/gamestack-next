// this hooks are specifically for GameDetailClient component

import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import queryClient from '@/lib/api';
import {
  addSession,
  getGameSessions,
  updateSession,
} from '@/lib/api/game-sessions';
import {
  addGameToList,
  fetchGameDetails,
  fetchUserGameDetail,
  removeGameFromList,
  updateUserGameData,
} from '@/lib/api/games';
import { GameData } from '@/models/interfaces';

type UseOptimisticUpdatingOptions<TData, TError, TVariables, TContext> =
  UseMutationOptions<TData, TError, TVariables, TContext> & {
    updater?: (prevData: TData | undefined, newData: TVariables) => TData;
  };

export const useOptimisticUpdating = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext extends { prevData: TData | undefined } = {
    prevData: TData | undefined;
  },
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
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    onMutate: async (newData: TVariables) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<TData>(queryKey);

      const optimisticData = options.updater
        ? options.updater(prevData, newData)
        : (newData as unknown as TData); // Fallback, recommend providing updater

      queryClient.setQueryData<TData>(queryKey, optimisticData);

      return { prevData } as TContext;
    },
    onError: (error, variables, context) => {
      if (context?.prevData !== undefined) {
        queryClient.setQueryData(queryKey, context.prevData);
      }
      options.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      options.onSettled?.(data, error, variables, context);
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
