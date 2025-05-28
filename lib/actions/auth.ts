'use client';
import axios, { isAxiosError } from 'axios';
import { redirect } from 'next/navigation';

import projectConfig from '@/config/config';
import { createClient } from '@/lib/supabase/client';

export async function login(
  prevState: unknown,
  formData: FormData,
): Promise<{ errors: string | null }> {
  console.log(formData.get('email'));
  console.log(formData.get('password'));
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    console.log(error);
    return {
      errors: 'Invalid email or password',
    };
  }

  redirect('/');
}

export async function signUp(
  prevState: unknown,
  formData: FormData,
): Promise<{
  message?: string | null;
  error?: string | null;
}> {
  const user = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    firstName: formData.get('first-name') as string,
    lastName: formData.get('last-name') as string,
  };

  try {
    const res = await axios.post(`${projectConfig.API_URL}/auth/signup`, user);

    if (res) {
      return {
        message: 'User signup successful!',
      };
    }

    // fallback in case res is falsy (very unlikely)
    return {
      error: 'Signup request did not return a valid response.',
    };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        error: e.response?.data.message,
      };
    }

    return {
      error: 'Something went wrong in user registration.',
    };
  }
}
