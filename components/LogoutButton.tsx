'use client';
import Button from './UI/Button';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

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
