'use client';

import { useEffect, useState } from 'react';

import Accordion from '@/components/UI/Accordion';
import Button from '@/components/UI/Button';
import Radio from '@/components/UI/Radio';
// import Checkbox from './UI/Checkbox';
import { statusOptions, timeUnitOptions } from '@/data/dropdowns';
import { GameListFilters, Status, TimeUnit } from '@/models/types';

type FilterProps = {
  onFilterChange: (filters: GameListFilters) => void;
};

const initialFilters: GameListFilters = {
  title: '',
  status: '',
  timeUnit: '',
};

const Filter = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState<GameListFilters>(initialFilters);

  useEffect(() => {
    console.log('filters updated', filters);
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleStatusSelect = (status: Status | '') => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: status,
    }));
  };

  const handleFilterByTimeUnit = (timeUnit: TimeUnit | '') => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      timeUnit: timeUnit,
    }));
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      title: e.target.value,
    }));
  }

  return (
    <div className='flex flex-col'>
      <div className='mb-4 flex flex-col'>
        <label>Search library by title</label>
        <input
          className='mt-2 w-full rounded-sm border border-stone-500 bg-stone-100 px-2 text-lg text-stone-800'
          type='text'
          onChange={handleInputChange}
          value={filters.title}
        ></input>
      </div>

      <Button
        className='text-left text-amber-500! hover:text-amber-400!'
        type='button'
        textOnly
        onClick={() => setFilters(initialFilters)}
      >
        Reset filters
      </Button>

      <Accordion className='mt-4' label='Filter by Status' isOpen>
        <div className='flex flex-col gap-1'>
          <Radio
            name='status'
            id='all_status'
            label='All'
            value=''
            checked={filters.status === ''}
            onChange={() => handleStatusSelect('')}
          />
          {statusOptions.map((status) => (
            <Radio
              key={status.value}
              name='status'
              id={String(status.value)}
              label={status.label}
              value={status.value}
              checked={filters?.status === status.value}
              onChange={() => handleStatusSelect(status.value)}
            />
          ))}
        </div>
      </Accordion>

      <Accordion className='mt-4' label='Filter by Date Updated' isOpen>
        <div className='flex flex-col gap-1'>
          <Radio
            name='timeUnit'
            id='all_timeUnit'
            label='All'
            value=''
            checked={filters.timeUnit === ''}
            onChange={() => handleFilterByTimeUnit('')}
          />
          {timeUnitOptions.map((option) => (
            <Radio
              key={option.value}
              name='timeUnit'
              id={String(option.value)}
              label={option.label}
              value={option.value}
              checked={filters?.timeUnit === option.value}
              onChange={() => handleFilterByTimeUnit(option.value)}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default Filter;
