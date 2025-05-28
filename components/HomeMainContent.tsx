'use client';
import { JSX, useState } from 'react';

import { GameListFilters } from '@/models/types';
import useDebounce from '@/utils/hooks/useDebounce';

import GameList from './GameList';
import Sidebar from './Sidebar';

const HomeMainContent = (): JSX.Element => {
  const [filters, setFilters] = useState<GameListFilters>({});
  const deboucedFilters = useDebounce(filters, 1000);

  function handleFilterChange(newFilters: GameListFilters) {
    setFilters(newFilters);
  }

  return (
    <div className='mt-10 flex flex-col gap-10 xl:flex-row xl:gap-8'>
      <div className='glass-black min-h-[400px] rounded-sm border border-stone-600 p-4 xl:w-1/4'>
        <Sidebar onFilterChange={handleFilterChange} />
      </div>

      <div className='w-full'>
        <GameList filters={deboucedFilters} />
      </div>
    </div>
  );
};

export default HomeMainContent;
