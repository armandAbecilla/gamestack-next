'use client';

import GameDetails from '@/components/GameDetails';
import EditNotesModal from '@/components/EditNotesModal';
import Button from '@/components/UI/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import queryClient from '@/lib/api/index';
import {
  fetchGameDetails,
  fetchUserGameDetail,
  addGameToList,
  removeGameFromList,
  updateUserGameData,
} from '@/lib/api/games';

const useOptimisticUpdating = (queryKey, mutationFn, options = {}) => {
  return useMutation({
    mutationFn: mutationFn,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });

      const prevData = queryClient.getQueryData(queryKey);
      // set data
      queryClient.setQueryData(queryKey, newData);

      return {
        prevData: prevData,
      };
    },
    onError: (error, data, context) => {
      // revert to previous data if an error occurs
      queryClient.setQueryData(queryKey, context.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    ...options,
  });
};

export default function GameDetailClient({ gameId }) {
  const auth = useSelector((state) => state.auth);

  const userGameKey = ['userGame', gameId, auth.user?.id]; // keys for queryKey
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
    queryFn: ({ signal, queryKey }) => {
      return fetchUserGameDetail({
        signal,
        userId: auth.user.id,
        gameId: gameId,
      });
    },
  });

  const mutateAddToLibrary = useOptimisticUpdating(userGameKey, addGameToList, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
    },
  });
  const mutateRemoveFromLibrary = useOptimisticUpdating(
    userGameKey,
    removeGameFromList
  );
  const mutateUpdateUserGameData = useOptimisticUpdating(
    userGameKey,
    updateUserGameData
  );

  async function handleAddToLibrary() {
    if (!userGameData) {
      mutateAddToLibrary.mutate({
        data: {
          userId: auth.user.id,
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

  async function handleStatusChange(status) {
    mutateUpdateUserGameData.mutate({
      id: userGameData.id,
      gameData: {
        ...userGameData,
        status,
      },
    });
  }

  function handleUpdateNote(updatedNote) {
    mutateUpdateUserGameData.mutate({
      id: userGameData.id,
      gameData: {
        ...userGameData,
        notes: updatedNote,
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
      <Button onClick={() => redirect('/')} className='mb-4 text-lg' textOnly>
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
      />

      <EditNotesModal
        gameTitle={gameData?.name}
        open={notesModalOpen}
        userGameData={userGameData}
        onClose={handleCloseModal}
        onUpdateNote={handleUpdateNote}
        isUpdating={mutateUpdateUserGameData.isPending}
      />
    </>
  );
}
