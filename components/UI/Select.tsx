import { DetailedHTMLProps, JSX, SelectHTMLAttributes } from 'react';

import { SelectOption } from '@/models/types';

type SelectProps = {
  id: string;
  options: SelectOption[];
  defaultPlaceholder: string;
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const Select = ({
  id,
  options,
  defaultPlaceholder = 'Please Select',
  ...props
}: SelectProps): JSX.Element => {
  return (
    <select
      className='w-full bg-white p-1 text-xl text-stone-800 focus:outline-none'
      id={id}
      name={id}
      {...props}
    >
      <option value='' disabled>
        {defaultPlaceholder}
      </option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
