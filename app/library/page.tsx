import { redirect } from 'next/navigation';

import LibraryContent from '@/components/LibraryContent';
import Search from '@/components/Search';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'My Library',
  description: 'Browse your collection',
};

const Library = async () => {
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
      <LibraryContent />
    </>
  );
};

export default Library;
