import SignupForm from '@/components/auth/SignupForm';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

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
