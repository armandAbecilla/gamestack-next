'use client';
import { useState, useEffect } from 'react';

const useDebounce = (value: any, delay: number = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;
