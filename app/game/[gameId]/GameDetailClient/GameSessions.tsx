import { Pencil, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { JSX, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/UI/Button';
import { RootState } from '@/lib/store/store';
import { dateToString, minutesToHours } from '@/lib/utils';
import { GameSession } from '@/models/types';

import { useGetGameSessions } from './hooks';
import SessionModal from './SessionModal';

const GameSessions = (): JSX.Element => {
  const { gameId } = useParams();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;

  const { data: sessions, isLoading } = useGetGameSessions(
    gameId as string,
    userId as string,
  );

  const [open, setOpen] = useState(false);
  const mode = useRef<'add' | 'update'>('add');
  const [selectedSession, setSelectedSession] = useState<any>(undefined);

  const handleAddSesssion = () => {
    mode.current = 'add';
    setOpen(true);
  };

  const handleClose = () => {
    mode.current = 'add';
    setOpen(false);
    setSelectedSession(undefined);
  };

  const handleEdit = (session: GameSession) => {
    mode.current = 'update';
    setSelectedSession(session);
    setOpen(true);
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='font-heading text-2xl'>Game Session Logs</h2>
        <Button onClick={handleAddSesssion}>Add Session</Button>
      </div>

      {isLoading && <p>Fetching game sessions...</p>}

      {sessions?.length > 0 && !isLoading && (
        <div>
          {sessions.map((session: GameSession) => (
            <div
              key={session.id}
              className='mt-4 not-first:border-t not-first:border-stone-500 not-first:py-4 not-last:mb-4'
            >
              <div className='flex max-w-fit items-center justify-between gap-5'>
                <p>{dateToString(session.sessionDate)}</p>
                <p className='text-stone-300'>
                  {minutesToHours(session.durationInMinutes)}
                </p>
              </div>
              <div className='flex justify-between'>
                <p>{session.notes || 'No notes'}</p>
                <div className='flex gap-4'>
                  <Pencil
                    className='h-[20px]'
                    onClick={() => handleEdit(session)}
                  />
                  <Trash2 className='h-[20px]' />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sessions?.length === 0 && !isLoading && (
        <p>No sessions yet. Start logging your sessions!</p>
      )}

      <SessionModal
        key={selectedSession?.id} // used the key trick here since to make sure the sessionData props sent here are always updated
        open={open}
        onClose={handleClose}
        mode={mode.current}
        sessionData={selectedSession}
      />
    </div>
  );
};

export default GameSessions;
