import { useParams } from 'next/navigation';
import { JSX, useRef, useState } from 'react';
import { DateValue } from 'react-aria-components';
import { useSelector } from 'react-redux';

import Button from '@/components/UI/Button';
import CustomDatePicker from '@/components/UI/CustomDatePicker';
import CustomNumberInput from '@/components/UI/CustomNumberInput';
import Input from '@/components/UI/Input';
import Modal from '@/components/UI/Modal';
import { RootState } from '@/lib/store/store';

import { useMutateAddSession } from './hooks';

type AddsessionModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddSessionModal = ({
  open,
  onClose,
}: AddsessionModalProps): JSX.Element => {
  const { gameId } = useParams();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;

  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [duration, setDuration] = useState<number>(30);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: addSession, isPending } = useMutateAddSession(
    gameId as string,
    userId as string,
  );

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !duration || !userId || !gameId) {
      return;
    }
    const data = {
      gameId: gameId as string,
      userId,
      date: selectedDate?.toString(),
      duration,
      notes: inputRef.current?.value || '',
    };

    addSession({ gameSessionData: data });

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeOnClickOutside={true}
      className='md:w-[600px]!'
    >
      <h1 className='font-heading mb-2 text-2xl'>Add Session</h1>

      <form onSubmit={handleAddSession}>
        <div className='flex flex-col gap-4 md:flex-row'>
          <CustomDatePicker
            label='Date'
            onDateSelect={(date) => setSelectedDate(date)}
            value={selectedDate}
            className='min-w-full md:min-w-1/2'
            required
          />
          <CustomNumberInput
            label='Duration (minutes)'
            value={duration}
            onValueChange={(value) => setDuration(value)}
            required
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='notes'>Notes</label>
          <Input
            id='notes'
            textarea
            placeholder='Write your thoughts...'
            className='text-sm!'
            ref={inputRef}
          />
        </div>
        <div className='mt-4 flex justify-end gap-2'>
          <Button type='button' onClick={onClose} textOnly>
            Cancel
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSessionModal;
