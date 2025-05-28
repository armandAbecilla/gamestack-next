'use client';

// import Button from './UI/Button';
// import Checkbox from './UI/Checkbox';
import { useEffect, useState } from 'react';

import Accordion from '@/components/UI/Accordion';
import Radio from '@/components/UI/Radio';
import { statusOptions } from '@/data/dropdowns';
import { GameListFilters } from '@/models/types';

type SidebarProps = {
  onFilterChange: (filters: GameListFilters) => void;
};

const Sidebar = ({ onFilterChange }: SidebarProps) => {
  const [filters, setFilters] = useState({
    title: '',
    status: '',
  });

  const [titleInput, setTitleInput] = useState('');

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleStatusSelect = (status: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: status,
    }));
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleInput(e.target.value);
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
          value={titleInput}
        ></input>
      </div>

      <Accordion label='Filter by Status' isOpen>
        <div className='flex flex-col gap-1'>
          <Radio
            name='status'
            id='all'
            label='All'
            value='all'
            defaultChecked
            onClick={() => handleStatusSelect('')}
          />
          {statusOptions.map((status) => (
            <Radio
              key={status.value}
              name='status'
              id={String(status.value)}
              label={status.label}
              value={status.value}
              defaultChecked={filters?.status === status.value}
              onClick={() => handleStatusSelect(String(status.value))}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default Sidebar;
