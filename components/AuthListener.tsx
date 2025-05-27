'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useDispatch } from 'react-redux';
import { authActions } from '@/lib/store/auth/auth';

const AuthListener = (): null => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch current user on load
    supabase.auth.getUser().then(({ data }) => {
      if (data.user !== null) {
        dispatch(authActions.setUser(data.user));
      }
    });

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(authActions.setUser(session?.user ?? null));
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
};

export default AuthListener;
