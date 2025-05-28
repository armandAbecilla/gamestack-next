'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { login } from '@/lib/actions/auth';
import useInput from '@/utils/hooks/useInput';
import { isEmailValid, isNotEmpty } from '@/utils/validations/validations';

export default function LoginForm() {
  const emailInput = useInput('', isEmailValid);
  const passwordInput = useInput('', isNotEmpty);
  const [state, formAction, pending] = useActionState(login, { errors: null });

  return (
    <div className='flex h-screen items-start justify-center pt-20'>
      <div className='w-full max-w-[500px]'>
        <div className='border-black-50 border p-8'>
          <h3 className='font-heading text-darkgreen mb-4 text-center text-2xl font-semibold uppercase'>
            Login at dagdagan na ang backlog!
          </h3>
          <form action={formAction} className='flex flex-col gap-4'>
            <div>
              <label htmlFor='email' className='text-stone-400'>
                Email
              </label>
              <Input
                value={emailInput.value}
                onChange={emailInput.onChange}
                onBlur={emailInput.onBlur}
                id='email'
                type='email'
                required
              />
              {emailInput.hasErrors && (
                <span className='text-sm text-red-500/80'>
                  Please enter a valid email address.
                </span>
              )}
            </div>

            <div>
              <label htmlFor='password' className='text-stone-400'>
                Password
              </label>
              <Input
                value={passwordInput.value}
                onChange={passwordInput.onChange}
                onBlur={passwordInput.onBlur}
                id='password'
                type='password'
                required
              />
              {passwordInput.hasErrors && (
                <span className='text-sm text-red-500/80'>
                  Please enter a password.
                </span>
              )}
            </div>

            <Link href='/signup' className='text-sm text-yellow-700'>
              Don&lsquo;t have an account?
            </Link>

            {state.errors && (
              <p className='text-center text-sm text-red-500/80'>
                {state.errors}
              </p>
            )}

            <div className='mx-auto'>
              <Button disabled={pending}>
                {pending ? 'Logging in please wait..' : 'Login'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
