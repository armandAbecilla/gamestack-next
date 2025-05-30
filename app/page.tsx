import Link from 'next/link';

import Search from '@/components/Search';
import UserStats from '@/components/UserStats';
import { createClient } from '@/lib/supabase/server';

const Home = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div>
        <h1 className='text-3xl text-stone-300'>
          Your Backlog Just Got Boss-Level!
        </h1>
        <h3 className='mt-4 text-xl text-stone-300'>
          <Link href='/login' className='cursor-pointer text-amber-500'>
            Login
          </Link>{' '}
          or{' '}
          <Link href='/signup' className='cursor-pointer text-amber-500'>
            create an account
          </Link>{' '}
          now to start adding more games to your backlog!
        </h3>
      </div>
    );
  }

  return (
    <>
      <div>
        {user && (
          <>
            <Search />
            <UserStats className='mt-10' userId={user.id} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
