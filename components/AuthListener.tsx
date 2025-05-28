'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDispatch } from 'react-redux';
import { authActions } from '@/lib/store/auth/auth';

const AuthListener = (): null => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const supabase = await createClient();

      // Fetch current user on load
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        dispatch(authActions.setUser(user));
      }

      // Listen to auth state changes
      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          dispatch(authActions.setUser(session?.user ?? null));
        },
      );

      // Cleanup
      return () => {
        listener.subscription.unsubscribe();
      };
    };

    const cleanupPromise = init();

    // Optional: cleanup from async effect
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, [dispatch]);

  return null;
};

export default AuthListener;
