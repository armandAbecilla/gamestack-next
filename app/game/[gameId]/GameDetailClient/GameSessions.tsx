import { useParams } from 'next/navigation';
import { JSX, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/UI/Button';
import { RootState } from '@/lib/store/store';
import { dateToString, minutesToHours } from '@/lib/utils';

import AddSessionModal from './AddSessionModal';
import { useGetGameSessions } from './hooks';

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

  const { data: sessions } = useGetGameSessions(
    gameId as string,
    userId as string,
  );

  console.log('sessions ', sessions);
  const [open, setOpen] = useState(false);
  const handleAddSession = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='font-heading text-2xl'>Game Session Logs</h2>
        <Button onClick={handleAddSession}>Add Session</Button>
      </div>

      {sessions?.length ? (
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
              <p>{session.notes || 'No notes'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No sessions yet. Start logging your sessions!</p>
      )}
      <AddSessionModal open={open} onClose={handleClose} />
    </div>
  );
};

export default GameSessions;
