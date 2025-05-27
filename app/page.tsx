import HomeMainContent from '@/components/HomeMainContent';
import Search from '@/components/Search';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const Home = async () => {
  // get the session from the createSupabaseServerClient server instance
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if no session then redirect to homepage
  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <Search />
      <HomeMainContent />
    </>
  );
};

export default Home;
