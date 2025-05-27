'use client';

import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import useInput from '@/utils/hooks/useInput';
import Link from 'next/link';
import { isEmailValid, isNotEmpty } from '@/utils/validations/validations';
import { useActionState } from 'react';
import { signUp } from '@/lib/actions/auth';

export default function SignupForm() {
  const emailInput = useInput('', isEmailValid);
  const firstNameInput = useInput('', isNotEmpty);
  const lastNameInput = useInput('', isNotEmpty);
  const passwordInput = useInput('', isNotEmpty);
  const repeatPasswordInput = useInput('', isNotEmpty);

  const [state, formAction, isLoading] = useActionState(signUp, {
    message: null,
    error: null,
  });

  const isPasswordsMatched = passwordInput.value === repeatPasswordInput.value;

  return (
    <div className='flex h-screen items-start justify-center pt-20'>
      <div className='w-full max-w-[500px]'>
        <div className='border-black-50 border p-8'>
          <h3 className='font-heading text-darkgreen mb-4 text-center text-2xl font-semibold uppercase'>
            Signup now and grow your backlog!
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
                label='Email'
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
              <label htmlFor='first-name' className='text-stone-400'>
                First Name
              </label>
              <Input
                value={firstNameInput.value}
                onChange={firstNameInput.onChange}
                onBlur={firstNameInput.onBlur}
                id='first-name'
                label='First Name'
                type='text'
                required
              />
              {firstNameInput.hasErrors && (
                <span className='text-sm text-red-500/80'>
                  Please enter your first name.
                </span>
              )}
            </div>

            <div>
              <label htmlFor='last-name' className='text-stone-400'>
                Last Name
              </label>
              <Input
                value={lastNameInput.value}
                onChange={lastNameInput.onChange}
                onBlur={lastNameInput.onBlur}
                id='last-name'
                label='Last Name'
                type='text'
                required
              />
              {lastNameInput.hasErrors && (
                <span className='text-sm text-red-500/80'>
                  Please enter your last name.
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
                label='Password'
                type='password'
                minLength={6}
                required
              />
              {passwordInput.hasErrors && (
                <span className='text-sm text-red-500/80'>
                  Please enter a password.
                </span>
              )}
            </div>

            <div>
              <label htmlFor='repeat-password' className='text-stone-400'>
                Repeat Password
              </label>
              <Input
                value={repeatPasswordInput.value}
                onChange={repeatPasswordInput.onChange}
                onBlur={repeatPasswordInput.onBlur}
                id='repeat-password'
                label='Repeat Password'
                type='password'
                required
              />
              {passwordInput.value && repeatPasswordInput.hasErrors && (
                <span className='block text-sm text-red-500/80'>
                  Please repeat your entered password again.
                </span>
              )}

              {passwordInput.touched &&
                repeatPasswordInput.touched &&
                !isPasswordsMatched && (
                  <span className='block text-sm text-red-500/80'>
                    Passwords do not match.
                  </span>
                )}
            </div>

            {state?.error && (
              <span className='block text-center text-sm text-red-500/80'>
                Account already exist!
              </span>
            )}

            {state?.message && (
              <span className='block bg-green-400/80 text-center text-sm'>
                Signup successful! Please check your inbox for verification
                email.
              </span>
            )}

            <div className='mx-auto'>
              <Button disabled={isLoading}>Register</Button>
            </div>

            <Link href='/login' className='text-center text-sm text-yellow-700'>
              Login if you already have an account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
