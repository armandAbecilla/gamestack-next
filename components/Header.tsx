'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import logoImage from '@/assets/gamestack-logo.png';
import { RootState } from '@/lib/store/store';

import LogoutButton from './LogoutButton';

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {user && (
        <header className='flex items-center justify-between py-7'>
          <div className='flex items-center gap-4'>
            <Link href='/'>
              <Image height={60} width={60} src={logoImage} alt='site logo' />
            </Link>

            <Link
              href='/'
              className='font-heading text-darkgreen text-[2rem] font-bold tracking-wider uppercase'
            >
              GameStack
            </Link>
          </div>
          <nav className='flex gap-4'>{user && <LogoutButton />}</nav>
        </header>
      )}
    </>
  );
};

export default Header;
