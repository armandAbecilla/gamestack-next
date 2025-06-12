import { DetailedHTMLProps, JSX, SelectHTMLAttributes } from 'react';

import { SelectOption } from '@/models/types';

type SelectProps = {
  id: string;
  options: SelectOption[];
  defaultPlaceholder: string;
  className?: string;
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const Select = ({
  id,
  options,
  defaultPlaceholder = 'Please Select',
  className,
  ...props
}: SelectProps): JSX.Element => {
  return (
    <select
      className={`h-9 w-full bg-white px-[calc(0.5rem_+_0.5px)] py-1 text-sm text-stone-800 focus:outline-none ${className}`}
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
