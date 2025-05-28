'use client';
// react hooks
import { useEffect, useRef } from 'react';

// components
import Button from './UI/Button';
import Input from './UI/Input';
import Modal from './UI/Modal';

type EditNotesModalProps = {
  gameTitle: string;
  userNote?: string;
  onUpdateNote: (value: string) => void;
  isUpdating: boolean;
  onClose: () => void;
  open: boolean;
};

export default function EditNotesModal({
  gameTitle,
  userNote,
  onUpdateNote,
  isUpdating,
  onClose,
  open,
}: EditNotesModalProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // will autoclose once the updating is done
  useEffect(() => {
    if (!isUpdating) {
      handleClose();
    }
  }, [isUpdating]);

  function handleUpdateNote(e: React.FormEvent) {
    e.preventDefault();
    const value = inputRef.current?.value;

    if (value) onUpdateNote(value);
  }

  function handleClose() {
    onClose();
  }

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
          placeholder={`Write your thoughts about ${gameTitle}...`}
          disabled={isUpdating}
          ref={inputRef}
          defaultValue={userNote}
        />
        <div className='mt-4 flex justify-end gap-5'>
          <Button
            textOnly
            type='button'
            className='text-white! hover:text-stone-100!'
            onClick={handleClose}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button type='submit' className='button' disabled={isUpdating}>
            {isUpdating ? 'Saving...' : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
