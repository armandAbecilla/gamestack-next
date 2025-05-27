import LoginForm from '@/components/auth/LoginForm';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const Login = async () => {
  // get the session from the createSupabaseServerClient server instance
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if there is a session then redirect to homepage
  if (session) {
    redirect('/');
  }

  return <LoginForm />;
};

export default Login;
