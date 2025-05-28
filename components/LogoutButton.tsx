'use client';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

import Button from './UI/Button';

const LogoutButton = () => {
  const handleLogout = async (): Promise<void> => {
    const supabase = await createClient();
    await supabase.auth.signOut();

    redirect('/login');
  };

  return (
    <Button textOnly onClick={handleLogout}>
      Sign out
    </Button>
  );
};

export default LogoutButton;
