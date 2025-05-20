'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from '@/lib/api';

export default function Providers({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    // create store instance the 1st time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
