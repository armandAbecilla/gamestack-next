import Image from 'next/image';
import { JSX } from 'react';

import Button from '@/components/UI/Button';
import FancySelect from '@/components/UI/FancySelect';
import { statusOptions } from '@/data/dropdowns';
import { GameData, UserGameData } from '@/models/interfaces';
import { SelectOption } from '@/models/types';

import GameDetailsSkeleton from './skeleton-loaders/GameDetails';
import Select from './UI/Select';

type GameDetailsProps = {
  gameData: GameData;
  isLoading?: boolean;
  onAddToLibrary: () => void;
  onRemoveFromLibrary: () => void;
  userGameData: UserGameData;
  onStatusChange: (status: string | number) => void;
  onPlatformSelect: (platform: string) => void;
  onEditNote: () => void;
};

const GameDetails = ({
  gameData,
  isLoading,
  onAddToLibrary,
  onRemoveFromLibrary,
  userGameData,
  onStatusChange,
  onPlatformSelect,
  onEditNote,
}: GameDetailsProps): JSX.Element => {
  //  skeleton loader
  if (isLoading) {
    return <GameDetailsSkeleton />;
  }

  const platformsSelect: SelectOption[] = gameData?.platforms.map((item) => ({
    id: item.platform.id,
    label: item.platform.name,
    value: item.platform.name,
  }));

  const platforms = platformsSelect?.map((i, index) => (
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
    <>
      {gameData && !isLoading && (
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
                  <FancySelect
                    options={statusOptions}
                    defaultValue={userGameData.status}
                    onChange={onStatusChange}
                  />

                  <Select
                    id='platformSelect'
                    defaultPlaceholder='Select Platform'
                    options={platformsSelect}
                    defaultValue={userGameData.platform || ''}
                    className='mt-4 max-w-[200px] !bg-stone-600 px-4 !text-lg !text-stone-300'
                    onChange={(e) => onPlatformSelect(e.target.value)}
                  />
                </>
              )}

              {/* user options */}
              <div className='mt-4'>
                {!onUserList ? (
                  <Button onClick={onAddToLibrary}>Add to Library</Button>
                ) : (
                  <>
                    <Button onClick={onRemoveFromLibrary}>
                      Remove from Library
                    </Button>
                    <Button className='ml-4' textOnly onClick={onEditNote}>
                      Edit note
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
    </>
  );
};

export default GameDetails;
