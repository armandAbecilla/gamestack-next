import { InputHTMLAttributes } from 'react';

type SearchInputProps = {
  id: string;
  className?: string;
  onClear: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const SearchInput = ({
  id,
  className = '',
  onClear,
  ...props
}: SearchInputProps) => {
  return (
    <div className='relative'>
      <input
        className={`w-full bg-white px-2 py-1 focus:outline-0 xl:text-xl ${className}`}
        id={id}
        name={id}
        type='text'
        {...props}
      />
      <button
        className='text-darkgreen absolute top-[1px] right-2.5 flex h-8 w-8 cursor-pointer items-center justify-center bg-transparent text-xl font-bold hover:bg-transparent focus:outline-none'
        aria-label='Close'
        onClick={onClear}
        type='button'
      >
        ×
      </button>
    </div>
  );
};

export default SearchInput;
