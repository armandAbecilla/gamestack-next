'use client';

import { motion } from 'framer-motion';
import { JSX, useCallback, useEffect, useState } from 'react';

import FilterToggle from '@/components/Icons/Filter';
import { GameListFilters } from '@/models/types';
import useDebounce from '@/utils/hooks/useDebounce';
import useIsMobile from '@/utils/hooks/useIsMobile';

import Filter from './Filter';
import GameList from './GameList';

const LibraryContent = (): JSX.Element => {
  const [filters, setFilters] = useState<GameListFilters>({});
  const deboucedFilters = useDebounce(filters, 1000);
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(false); // always show in Desktop, default false if mobile set via useEffect

  useEffect(() => {
    if (!isMobile) {
      // initiall state for desktop
      setIsFilterOpen(true);
      return;
    }

    // always set as false if mobile
    setIsFilterOpen(false);
  }, [isMobile]);

  const handleFilterChange = useCallback((newFilters: GameListFilters) => {
    setFilters(newFilters);
  }, []);

  // mobile only filter
  const handleToggleFilter = () => {
    setIsFilterOpen((prevState) => !prevState);
  };

  return (
    <div className='mt-10 flex flex-col xl:flex-row xl:gap-8'>
      <div className='xl:w-1/4'>
        <button
          type='button'
          className='mb-4 flex items-center md:hidden'
          onClick={handleToggleFilter}
        >
          <FilterToggle className='mr-2 h-[20px] w-[20px] text-stone-200' />
          <span>Show/Hide filters</span>
        </button>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            isFilterOpen
              ? { height: 'auto', opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div
            className={`glass-black mb-10 rounded-sm border border-stone-600 p-4 md:mb-0`}
          >
            <Filter onFilterChange={handleFilterChange} />
          </div>
        </motion.div>
      </div>

      <div className='w-full'>
        <GameList filters={deboucedFilters} />
      </div>
    </div>
  );
};

export default LibraryContent;
