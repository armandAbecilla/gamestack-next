import LoginForm from '@/components/auth/LoginForm';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

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
