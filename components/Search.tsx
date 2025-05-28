'use client';

import SearchInput from './UI/SearchInput';
import Skeleton from 'react-loading-skeleton';

// react hooks
import { useState, useEffect, useRef, JSX, ChangeEvent } from 'react';

// custom hooks
import useDebounce from '@/utils/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';

import { fetchGameByKeyword } from '@/lib/api/games';

import Link from 'next/link';
import Image from 'next/image';

const Search = (): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [isSearchOpen, setIssearchOpen] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(search, 1000);
  const searchRef = useRef<HTMLDivElement>(null);

  const {
    data: searchResult,
    isPending: isSearching,
    isError,
    error,
  } = useQuery({
    queryKey: ['games', debouncedSearchTerm],
    queryFn: ({ signal }) =>
      fetchGameByKeyword({ signal, searchTerm: debouncedSearchTerm }),
    enabled: debouncedSearchTerm !== '',
  });

  useEffect(() => {
    if (searchResult) {
      setIssearchOpen(true);
    }

    return () => {
      setIssearchOpen(false);
    };
  }, [searchResult, debouncedSearchTerm]);

  // Close on outside click
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent): void => {
      if (!searchRef.current?.contains(e.target as Node)) {
        setIssearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Event listeners

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleClearSearch = (): void => {
    setSearch('');
  };

  const handleSearchFocus = (): void => {
    if (search.trim() === '') return;
    setIssearchOpen(true);
  };

  let searchResultContent;

  const skeletonLoaders = (
    <ul>
      {[1, 2, 3, 4].map((i) => (
        <li key={i} className='border-stone-600 p-1 not-first:border-t'>
          <div className='flex items-center gap-5'>
            <Skeleton
              height={60}
              width={60}
              baseColor='#1b1b1b'
              highlightColor='#444'
            />
            <Skeleton
              height={20}
              count={2}
              width={600}
              baseColor='#1b1b1b'
              highlightColor='#444'
            />
          </div>
        </li>
      ))}
    </ul>
  );

  const searchResultList = (
    <ul>
      {searchResult?.map((game: any) => (
        <li key={game.id} className='border-stone-600 p-1 not-first:border-t'>
          <Link href={`/game/${game.id}`} className='flex items-center gap-5'>
            {game.background_image ? (
              <Image
                src={game.background_image}
                alt={game.name}
                className='aspect-square h-15 w-auto object-cover'
                height={60}
                width={60}
              />
            ) : (
              <Image
                src='https://placehold.co/400?text=No+image'
                alt={game.name}
                className='aspect-square h-15 w-auto object-cover'
                height={60}
                width={60}
              />
            )}
            <h4 className='text-xl'>{game.name}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );

  if (isSearching) {
    searchResultContent = skeletonLoaders;
  }

  if (searchResult) {
    searchResultContent = searchResultList;
  }

  return (
    <>
      <div className='relative' ref={searchRef}>
        <div className='bg-darkgreen/10 rounded-full border border-white/15 p-3 shadow-2xl backdrop-blur-md'>
          <SearchInput
            id='search'
            value={search}
            className='rounded-full bg-white px-5 text-stone-800'
            placeholder='Search games to add to your library'
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onFocus={handleSearchFocus}
          />
        </div>

        {isSearchOpen && (
          <div className='absolute z-200 mt-4 w-full rounded-sm bg-white/20 p-1 shadow backdrop-blur-xl'>
            {searchResultContent}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
