import { Pencil, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { JSX, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import ConfirmationModal from '@/components/ConfirmationModal';
import Button from '@/components/UI/Button';
import { RootState } from '@/lib/store/store';
import { dateToString, minutesToHours } from '@/lib/utils';
import { GameSession } from '@/models/types';

import { useGetGameSessions, useMutateDeleteSession } from './hooks';
import SessionModal from './SessionModal';

type ModeTypes = 'add' | 'update' | 'delete';

const GameSessions = (): JSX.Element => {
  const { gameId } = useParams();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;

  const { data: sessions, isLoading } = useGetGameSessions(
    gameId as string,
    userId as string,
  );

  const { mutate: removeSession } = useMutateDeleteSession(
    gameId as string,
    userId as string,
  );

  const [open, setOpen] = useState(false);
  const mode = useRef<ModeTypes>('add');
  const [selectedSession, setSelectedSession] = useState<
    GameSession | undefined
  >(undefined);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleAddSesssion = () => {
    mode.current = 'add';
    setOpen(true);
  };

  const handleCloseSessionModal = () => {
    mode.current = 'add';
    setOpen(false);
    setSelectedSession(undefined);
  };

  const handleSelectSession = (
    session: GameSession,
    modeStr: 'update' | 'delete',
  ) => {
    mode.current = modeStr;
    setSelectedSession(session);

    if (mode.current === 'update') {
      setOpen(true);
      return;
    }

    if (mode.current === 'delete') {
      setDeleteConfirmOpen(true);
      return;
    }
  };

  const handleConfirmationClose = () => {
    setDeleteConfirmOpen(false);
    mode.current = 'add'; // reset to default 'add' mode
    setSelectedSession(undefined);
  };

  const handleDeleteSession = () => {
    const sessionId = selectedSession?.id;
    if (sessionId) {
      removeSession({ id: sessionId });
      handleConfirmationClose();
    }
  };

  console.log(open);

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
                    onClick={() => handleSelectSession(session, 'update')}
                  />
                  <Trash2
                    className='h-[20px]'
                    onClick={() => handleSelectSession(session, 'delete')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {sessions?.length === 0 && !isLoading && (
        <p>No sessions yet. Start logging your sessions!</p>
      )}

      {(mode.current === 'add' || mode.current === 'update') && (
        <SessionModal
          key={selectedSession?.id} // used the key trick here since to make sure the sessionData props sent here are always updated
          open={open}
          onClose={handleCloseSessionModal}
          mode={mode.current}
          sessionData={selectedSession}
        />
      )}

      {mode.current === 'delete' && (
        <ConfirmationModal
          open={deleteConfirmOpen}
          onCancel={handleConfirmationClose}
          onClose={handleConfirmationClose}
          title='Confirm Delete'
          onConfirm={handleDeleteSession}
        >
          <p>This action is irreversible, are you sure?</p>
        </ConfirmationModal>
      )}
    </div>
  );
};

export default GameSessions;
