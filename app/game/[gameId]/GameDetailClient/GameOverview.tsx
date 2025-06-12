import Image from 'next/image';
import { useParams } from 'next/navigation';
import { JSX } from 'react';
import { useSelector } from 'react-redux';

import GameDetailsSkeleton from '@/components/skeleton-loaders/GameDetails';
import Button from '@/components/UI/Button';
import FancySelect from '@/components/UI/FancySelect';
import Select from '@/components/UI/Select';
import { statusOptions } from '@/data/dropdowns';
import { RootState } from '@/lib/store/store';
import { SelectOption } from '@/models/types';

import { useGameDetailClient } from './GameDetailContext';
import { useGameDetail, useUserGameData } from './hooks';

const GameOverview = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;
  const { gameId } = useParams();
  const { data: gameData, isLoading: isGameDataFetching } = useGameDetail(
    gameId as string,
  );
  const { data: userGameData } = useUserGameData(gameId as string, userId);

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
    <>
      {gameData && !isGameDataFetching && (
        <div className='pb-20'>
          <div className='flex flex-col gap-8 xl:flex-row'>
            <div className='relative h-[200px] w-full rounded-sm border border-stone-700 md:h-[350px] md:max-w-1/2'>
              <Image
                src={gameData.background_image}
                alt='image preview'
                fill
                className='object-cover'
              />
            </div>

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
                  </>
                )}
              </div>
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

export default GameOverview;
