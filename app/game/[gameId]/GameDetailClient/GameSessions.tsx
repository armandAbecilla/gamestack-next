import { Pencil, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { JSX, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/UI/Button';
import { RootState } from '@/lib/store/store';
import { dateToString, minutesToHours } from '@/lib/utils';

import { useGetGameSessions } from './hooks';
import SessionModal from './SessionModal';

type SessionData = {
  id: string;
  session_date: string;
  duration_minutes: number;
  notes?: string;
};

const GameSessions = (): JSX.Element => {
  const { gameId } = useParams();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;

  const {
    data: sessions,
    isLoading,
    isPending,
  } = useGetGameSessions(gameId as string, userId as string);

  const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='font-heading text-2xl'>Game Session Logs</h2>
        <Button onClick={handleSubmit}>Add Session</Button>
      </div>

      {isLoading && <p>Fetching game sessions...</p>}

      {sessions?.length > 0 && !isPending && (
        <div>
          {sessions.map((session: SessionData) => (
            <div
              key={session.id}
              className='mt-4 not-first:border-t not-first:border-stone-500 not-first:py-4 not-last:mb-4'
            >
              <div className='flex max-w-fit items-center justify-between gap-5'>
                <p>{dateToString(session.session_date)}</p>
                <p className='text-stone-300'>
                  {minutesToHours(session.duration_minutes)}
                </p>
              </div>
              <div className='flex justify-between'>
                <p>{session.notes || 'No notes'}</p>
                <div className='flex gap-4'>
                  <Pencil />
                  <Trash2 />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sessions?.length === 0 && !isLoading && (
        <p>No sessions yet. Start logging your sessions!</p>
      )}

      <SessionModal open={open} onClose={handleClose} mode='add' />
    </div>
  );
};

export default GameSessions;
