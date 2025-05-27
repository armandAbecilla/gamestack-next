'use client';
import Button from './UI/Button';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

const LogoutButton = () => {
  const handleLogout = async (): Promise<void> => {
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
