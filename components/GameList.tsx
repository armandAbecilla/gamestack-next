'use client';
// components

// react hooks
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchUserGames, MAX_PAGE_SIZE } from '@/lib/api/games';
import querySelector from '@/lib/api/index';
import { RootState } from '@/lib/store/store';
import { GameListItem } from '@/models/interfaces';
import { GameDataResponse } from '@/models/types';

import GameCard from './GameCard';
import GamesListSkeleton from './skeleton-loaders/GamesList';
import Pagination from './UI/Pagination';

type GameListProps = {
  filters?: { title?: string; status?: string };
};

const GameList = ({ filters }: GameListProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const gamesQueryKey =
    filters?.status || filters?.title
      ? ['games', page, filters]
      : ['games', page];

  useEffect(() => {
    querySelector.invalidateQueries({
      queryKey: ['games'],
    });
  }, [filters]);

  // react query
  const {
    data,
    isPending: isLoading,
    isError,
    error,
  } = useQuery<GameDataResponse>({
    queryKey: gamesQueryKey,
    queryFn: ({ signal }) =>
      fetchUserGames({
        signal,
        userId: userId ? userId : '',
        page: page,
        filters: filters,
      }),
    enabled: !!userId,
  });

  if (isError) {
    console.log(error);
    console.log(data);
  }

  // pagination functions
  function handleOnSetPage(page: number) {
    setPage(page);
  }

  if (isLoading) {
    return <GamesListSkeleton />;
  }

  if (!isLoading && data?.count === 0) {
    return (
      <p className='text-center text-4xl'>
        Start adding games to your backlog now!
      </p>
    );
  }

  return (
    <div>
      {data && (
        <Pagination
          pageSize={MAX_PAGE_SIZE}
          paginatingItemsClassNames='grid grid-cols-2 gap-4 xl:grid-cols-4'
          currentPage={page}
          totalCount={data.count}
          onSetPage={handleOnSetPage}
        >
          {data.games.map((game: GameListItem) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.background_image}
            />
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default GameList;
