'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

import logoImage from '@/assets/gamestack-logo.png';
import { RootState } from '@/lib/store/store';

import LogoutButton from './LogoutButton';

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const path = usePathname();
  const activeClass = 'text-amber-500';
  const isAuthPages = path === '/login' || path === '/signup';

  return (
    <>
      {!isAuthPages && (
        <header className='flex items-center justify-between py-7'>
          <div className='flex items-center gap-4'>
            <Link href='/'>
              <Image height={60} width={60} src={logoImage} alt='site logo' />
            </Link>

            <Link
              href='/'
              className='font-heading text-darkgreen hidden cursor-pointer text-lg font-bold tracking-wider uppercase md:block md:text-[2rem]'
            >
              GameStack
            </Link>
          </div>

          {user && (
            <nav>
              <ul className='flex items-center gap-4'>
                <li
                  className={`hover:text-amber-400 ${path.startsWith('/library') ? activeClass : undefined}`}
                >
                  <Link href='/library'>My Collection</Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </nav>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
