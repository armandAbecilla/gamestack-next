import HomeMainContent from '@/components/HomeMainContent';
import Search from '@/components/Search';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const Home = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
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
