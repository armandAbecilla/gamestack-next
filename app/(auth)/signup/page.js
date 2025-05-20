import SignupForm from '@/components/auth/SignupForm';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Signup() {
  // get the session from the createSupabaseServerClient server instance
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if there is a session then redirect to homepage
  if (session) {
    redirect('/');
  }

  return <SignupForm />;
}
