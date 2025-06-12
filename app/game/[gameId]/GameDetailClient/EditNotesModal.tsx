'use client';
// react hook
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
// components
import { useSelector } from 'react-redux';

import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Modal from '@/components/UI/Modal';
import { RootState } from '@/lib/store/store';

import { useGameDetailClient } from './GameDetailContext';
import { useGameDetail, useUserGameData } from './hooks';

type EditNotesModalProps = {
  onClose: () => void;
  open: boolean;
};

export default function EditNotesModal({ onClose, open }: EditNotesModalProps) {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;
  const { gameId } = useParams();

  const { data: gameData } = useGameDetail(gameId as string);
  const { data: userGameData } = useUserGameData(gameId as string, userId);

  const { setNotes, isUserGameDataUpdating, gameUpdateSuccess } =
    useGameDetailClient();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClose = useCallback(
    function handleClose() {
      onClose();
    },
    [onClose],
  );

  function handleUpdateNote(e: React.FormEvent) {
    e.preventDefault();
    const value = inputRef.current?.value;

    if (value) {
      setNotes(value);
    }
  }

  useEffect(() => {
    if (gameUpdateSuccess) {
      handleClose();
    }
  }, [gameUpdateSuccess, handleClose]);

  return (
    <Modal
      className='m-auto max-w-lg' // set the max width
      onClose={handleClose}
      open={open}
    >
      <h4 className='font-heading mb-4 flex items-center text-xl text-stone-300'>
        Update Notes
      </h4>

      <form onSubmit={handleUpdateNote}>
        <Input
          id='notes'
          textarea
          className='rounded-sm bg-white/95 text-lg'
          rows={10}
          placeholder={`Write your thoughts about ${gameData?.name}...`}
          disabled={isUserGameDataUpdating}
          ref={inputRef}
          defaultValue={userGameData?.notes}
        />
        <div className='mt-4 flex justify-end gap-5'>
          <Button
            textOnly
            type='button'
            className='text-white! hover:text-stone-100!'
            onClick={handleClose}
            disabled={isUserGameDataUpdating}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='button'
            disabled={isUserGameDataUpdating}
          >
            {isUserGameDataUpdating ? 'Saving...' : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
