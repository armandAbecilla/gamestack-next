import { redirect } from 'next/navigation';

import SignupForm from '@/components/auth/SignupForm';
import { createClient } from '@/lib/supabase/server';

const Signup = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return <SignupForm />;
};

export default Signup;
