import GameDetailsSkeleton from './skeleton-loaders/GameDetails';
import Button from '@/components/UI/Button';
import FancySelect from '@/components/UI/FancySelect';

import { statusOptions } from '@/data/dropdowns';
import { JSX } from 'react';
import { GameData, UserGameData } from '@/models/interfaces';

type GameDetailsProps = {
  gameData: GameData;
  isLoading?: boolean;
  onAddToLibrary: () => void;
  onRemoveFromLibrary: () => void;
  userGameData: UserGameData;
  onStatusChange: () => void;
  onEditNote: () => void;
};

const GameDetails = ({
  gameData,
  isLoading,
  onAddToLibrary,
  onRemoveFromLibrary,
  userGameData,
  onStatusChange,
  onEditNote,
}: GameDetailsProps): JSX.Element => {
  //  skeleton loader
  if (isLoading) {
    return <GameDetailsSkeleton />;
  }

  const platforms = gameData.platforms.map((item, index) => (
    <span key={item.platform.id}>
      {item.platform.name}
      {index !== gameData.platforms.length - 1 ? ', ' : ''}
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
          <div className='flex flex-col gap-5 xl:flex-row'>
            <img
              className='aspect-auto max-w-[500px] object-cover xl:h-[700px]'
              src={gameData.background_image}
            />
            <div className='flex flex-col gap-4'>
              <h1 className='font-heading text-3xl xl:text-5xl'>
                {gameData.name}
              </h1>
              <h4 className='text-stone-100'>
                Release date: {gameData.released}
              </h4>
              <div className='flex gap-2'>
                <h4 className='text-stone-100'>Available on:</h4>
                <p>{platforms}</p>
              </div>
              <span className='text-stone-100'>
                Metacritic Score: {gameData.metacritic || 'Not yet available'}
              </span>
              <span className='text-stone-100'>Developed by: {developers}</span>
              <h4 className='font-h mt-5 text-xl'>Description:</h4>
              <div
                className='flex flex-col gap-2 text-stone-300'
                dangerouslySetInnerHTML={{
                  __html: gameData.description,
                }}
              ></div>

              {onUserList && (
                <FancySelect
                  options={statusOptions}
                  defaultValue={userGameData.status}
                  onChange={onStatusChange}
                />
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

          {userGameData && (
            <div className='mt-4 pt-4'>
              <h4 className='font-heading text-xl text-stone-200'>
                User notes:
              </h4>
              {userGameData?.notes && <p>{userGameData?.notes}</p>}
              {!userGameData?.notes && <p>No user notes for this game.</p>}
            </div>
          )}

          <div className='mt-4 border-t border-stone-700 pt-4'>
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
