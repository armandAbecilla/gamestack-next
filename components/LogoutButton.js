'use client';
import Button from './UI/Button';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function LogoutButton() {
  async function handleLogout() {
    await supabase.auth.signOut();

    redirect('/login');
  }

  return (
    <Button textOnly onClick={handleLogout}>
      Sign out
    </Button>
  );
}
