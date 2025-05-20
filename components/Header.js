'use client';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import Image from 'next/image';
import logoImage from '@/assets/gamestack-logo.png';
import { useSelector } from 'react-redux';

export default function Header() {
  const { user } = useSelector((state) => state.auth);

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
}
