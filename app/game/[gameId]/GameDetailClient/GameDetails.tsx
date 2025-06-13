'use client';

<<<<<<< Updated upstream
import Image from 'next/image';
=======
import Link from 'next/link';
>>>>>>> Stashed changes
import { useParams } from 'next/navigation';
import { JSX, useState } from 'react';
import { useSelector } from 'react-redux';

import GameDetailsSkeleton from '@/components/skeleton-loaders/GameDetails';
import Button from '@/components/UI/Button';
import FancySelect from '@/components/UI/FancySelect';
import Select from '@/components/UI/Select';
import { statusOptions } from '@/data/dropdowns';
import { RootState } from '@/lib/store/store';
import { SelectOption } from '@/models/types';

import EditNotesModal from './EditNotesModal';
import { useGameDetailClient } from './GameDetailContext';
import GameLogModal from './GameLogModal';
import { useGameDetail, useUserGameData } from './hooks';

// type GameDetailsProps = {
//   onStartDateSelect: (date: DateValue | null) => void;
//   onCompletedDateSelect: (date: DateValue | null) => void;
// };

const GameDetails = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;
  const { gameId } = useParams();
  const { data: gameData, isLoading: isGameDataFetching } = useGameDetail(
    gameId as string,
  );
  const { data: userGameData } = useUserGameData(gameId as string, userId);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [gameLogModalOpen, setGameLogModalOpen] = useState(false);

  const { addToLibrary, removeFromLibrary, setStatus, setPlatform } =
    useGameDetailClient();
  //  skeleton loader
  if (isGameDataFetching) {
    return <GameDetailsSkeleton />;
  }

  if (!gameData) {
    return <p>Data not found </p>;
  }

  const platformsSelect: SelectOption[] = gameData.platforms.map((item) => ({
    id: item.platform.id,
    label: item.platform.name,
    value: item.platform.name,
  }));

  const platforms = platformsSelect.map((i, index) => (
    <span key={i.value}>
      {i.value}
      {index !== platformsSelect.length - 1 ? ', ' : ''}
    </span>
  ));

  const developers = gameData.developers.map(
    (devs, index) =>
      `${devs.name}${index !== gameData.developers.length - 1 ? ', ' : ''}`,
  );

  const pcPlatform = gameData.platforms.find(
    (item) => item.platform.name === 'PC',
  );

  // System Requirements
  const minimumRequirement = (
    <span className='mb-1 block whitespace-pre-line'>
      {pcPlatform?.requirements?.minimum ||
        'Minimum requirements not yet available'}
    </span>
  );

  const recommendedRequirement = (
    <span className='mb-1 block whitespace-pre-line'>
      {pcPlatform?.requirements?.recommended ||
        'Recommended requirements not yet available'}
    </span>
  );

  const onUserList = userGameData && !!userGameData;

  return (
<<<<<<< Updated upstream
    <>
      {gameData && !isGameDataFetching && (
        <div className='pb-20'>
          <h1 className='font-heading mb-5 text-3xl xl:text-5xl'>
            {gameData.name}
          </h1>
          <div className='flex flex-col gap-8 xl:flex-row'>
            <div className='relative h-[200px] w-full rounded-sm border border-stone-700 md:h-[350px] md:max-w-1/2'>
              <Image
                src={gameData.background_image}
                alt='image preview'
                fill
                className='object-cover'
              />
            </div>
            {/* <img
              className='aspect-auto max-w-[500px] object-cover xl:h-[700px]'
              src={gameData.background_image}
            /> */}

            <div className='flex flex-col gap-4'>
              <h4 className='text-stone-100'>
                Release date: {gameData.released}
              </h4>
              <div className='flex gap-3'>
                <h4 className='text-nowrap text-stone-100'>Available on:</h4>
                <p>{platforms}</p>
              </div>
              <span className='text-stone-100'>
                Metacritic Score: {gameData.metacritic || 'Not yet available'}
              </span>
              <span className='text-stone-100'>Developed by: {developers}</span>

              {onUserList && (
                <>
                  <div className='flex items-center gap-4'>
                    <FancySelect
                      options={statusOptions}
                      defaultValue={userGameData.status}
                      onChange={(status) => setStatus(status as string)}
                    />

                    <Select
                      id='platformSelect'
                      defaultPlaceholder='Select Platform'
                      options={platformsSelect}
                      defaultValue={userGameData.platform || ''}
                      className='max-w-[200px] !bg-stone-600 !text-stone-300'
                      onChange={(e) => setPlatform(e.target.value)}
                    />
                  </div>

                  {/* {onUserList && userGameData.status !== 'wishlist' && (
                    <div className='flex items-center gap-4'>
                      <CustomDatePicker
                        onDateSelect={onStartDateSelect}
                        label='Date Started'
                        className='flex-1'
                      />

                      <CustomDatePicker
                        onDateSelect={onCompletedDateSelect}
                        label='Date Completed'
                        className='flex-1'
                      />
                    </div>
                  )} */}
                </>
              )}

              {/* user options */}
              <div className='mt-4'>
                {!onUserList ? (
                  <Button onClick={() => addToLibrary(gameData)}>
                    Add to Library
                  </Button>
                ) : (
                  <>
                    <Button onClick={removeFromLibrary}>
                      Remove from Library
                    </Button>
                    <Button
                      className='ml-4'
                      textOnly
                      onClick={() =>
                        setNotesModalOpen((prevState) => !prevState)
                      }
                    >
                      Edit note
                    </Button>
                    <Button
                      className='ml-4'
                      textOnly
                      onClick={() => setGameLogModalOpen(true)}
                    >
                      Edit User Logs
                    </Button>
                  </>
                )}
              </div>

              {/* <div>
                   <h5 className='text-lg text-stone-300'>Notes:</h5>
                   <p className='text-stone-300'>
                     Add this game to your list to start adding notes!
                   </p>
                 </div> */}
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <h4 className='font-heading mt-5 text-2xl'>Description:</h4>
            <div
              className='flex flex-col gap-2 text-stone-300'
              dangerouslySetInnerHTML={{
                __html: gameData.description,
              }}
            ></div>
          </div>

          {userGameData && (
            <div className='mt-10 border-t border-stone-700 pt-10'>
              <h4 className='font-heading text-xl text-stone-200'>
                User notes:
              </h4>
              {userGameData?.notes && <p>{userGameData?.notes}</p>}
              {!userGameData?.notes && <p>No user notes for this game.</p>}
            </div>
          )}

          <div className='mt-10 border-t border-stone-700 pt-4'>
            <h4 className='font-heading text-xl text-stone-200'>
              PC System Requirements
            </h4>

            <div className='flex flex-col gap-4 xl:flex-row xl:gap-15'>
              <div className='mt-4 basis-1/2'>{minimumRequirement}</div>
              <div className='mt-4 basis-1/2'>{recommendedRequirement}</div>
            </div>
          </div>
        </div>
      )}

      <EditNotesModal
        open={notesModalOpen}
        onClose={() => setNotesModalOpen(false)}
      />

      <GameLogModal open={gameLogModalOpen} />
    </>
=======
    <div>
      <Link className='text-stone-300 hover:text-stone-400' href='/library'>
        ← Back to library
      </Link>
      <h1 className='font-heading mt-4 mb-5 text-3xl xl:text-5xl'>
        {gameData?.name}
      </h1>
      <Tabs defaultValue='overview'>
        <TabsList className='h-auto w-full justify-start gap-0.5 bg-transparent p-0'>
          <TabsTrigger value='overview' className={tabsTriggerClassname}>
            Overview
          </TabsTrigger>
          <TabsTrigger value='sessions' className={tabsTriggerClassname}>
            Game Sessions
          </TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <GameOverview />
        </TabsContent>
        <TabsContent value='sessions'>
          <GameSessions />
        </TabsContent>
      </Tabs>
    </div>
>>>>>>> Stashed changes
  );
};

export default GameDetails;
