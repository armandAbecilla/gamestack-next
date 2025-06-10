'use client';

import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import EditNotesModal from '@/components/EditNotesModal';
import GameDetails from '@/components/GameDetails';
import Button from '@/components/UI/Button';
import {
  fetchGameDetails,
  fetchUserGameDetail,
  addGameToList,
  removeGameFromList,
  updateUserGameData,
} from '@/lib/api/games';
import queryClient from '@/lib/api/index';
import { RootState } from '@/lib/store/store';

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

export default function GameDetailClient({ gameId }: { gameId: string }) {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;

  const userGameKey = ['userGame', gameId, userId]; // keys for queryKey
  const [notesModalOpen, setNotesModalOpen] = useState(false);

  // game information
  const { data: gameData, isPending: isGameFetching } = useQuery({
    queryKey: ['selectedGame', gameId],
    queryFn: ({ signal }) => {
      return fetchGameDetails({ signal, gameId: gameId });
    },
  });

  const { data: userGameData } = useQuery({
    queryKey: userGameKey,
    queryFn: ({ signal }) => {
      return fetchUserGameDetail({
        signal,
        userId: userId ? userId : '',
        gameId: gameId,
      });
    },
    enabled: !!userId,
  });

  const mutateAddToLibrary = useOptimisticUpdating(userGameKey, addGameToList, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
      queryClient.invalidateQueries({
        queryKey: ['stats'], // invalidate the stats in homepage
      });
    },
  });

  const mutateRemoveFromLibrary = useOptimisticUpdating(
    userGameKey,
    removeGameFromList,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['stats'], // invalidate the stats in homepage
        });
      },
    },
  );
  const mutateUpdateUserGameData = useOptimisticUpdating(
    userGameKey,
    updateUserGameData,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['stats'], // invalidate the stats in homepage
        });
      },
    },
  );

  async function handleAddToLibrary() {
    if (!userGameData) {
      mutateAddToLibrary.mutate({
        data: {
          userId: userId ? userId : '',
          rawgGameId: gameId,
          rawgGameTitle: gameData.name,
          status: '',
          notes: 'test',
        },
      });
    }
  }

  async function handleRemoveFromLibrary() {
    // if action == remove from library
    if (userGameData) {
      mutateRemoveFromLibrary.mutate({ id: userGameData.id });
    }
  }

  async function handleStatusChange(status: string | number) {
    mutateUpdateUserGameData.mutate({
      id: userGameData.id,
      gameData: {
        ...userGameData,
        status,
      },
    });
  }

  function handleUpdateNote(updatedNote: string) {
    mutateUpdateUserGameData.mutate({
      id: userGameData.id,
      gameData: {
        ...userGameData,
        notes: updatedNote,
      },
    });
  }

  function handlePlatformSelect(platform: string) {
    mutateUpdateUserGameData.mutate({
      id: userGameData.id,
      gameData: {
        ...userGameData,
        platform: platform,
      },
    });
  }

  // Edit notes handlers
  function handleOpenModal() {
    setNotesModalOpen(true);
  }

  function handleCloseModal() {
    setNotesModalOpen(false);
  }

  return (
    <>
      <Button
        onClick={() => redirect('/library')}
        className='mb-4 text-lg'
        textOnly
      >
        ← Back to your library
      </Button>
      <GameDetails
        gameData={gameData}
        userGameData={userGameData}
        onAddToLibrary={handleAddToLibrary}
        onRemoveFromLibrary={handleRemoveFromLibrary}
        onStatusChange={handleStatusChange}
        onEditNote={handleOpenModal}
        isLoading={isGameFetching}
        onPlatformSelect={handlePlatformSelect}
      />

      <EditNotesModal
        gameTitle={gameData?.name}
        open={notesModalOpen}
        userNote={userGameData?.notes}
        onClose={handleCloseModal}
        onUpdateNote={handleUpdateNote}
        isUpdating={mutateUpdateUserGameData.isPending}
      />
    </>
  );
}
