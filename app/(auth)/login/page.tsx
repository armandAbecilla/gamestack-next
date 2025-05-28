import { redirect } from 'next/navigation';

import LoginForm from '@/components/auth/LoginForm';
import { createClient } from '@/lib/supabase/server';

const Login = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return <LoginForm />;
};

export default Login;
