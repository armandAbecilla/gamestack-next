'use client';
import { supabase } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import { projectConfig } from '@/config/config';
import axios from 'axios';

export async function login(prevState, formData) {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (error) {
    console.log(error);
    return {
      errors: 'Invalid email or password',
    };
  }

  redirect('/');
}

export async function signUp(prevState, formData) {
  const user = {
    email: formData.get('email'),
    password: formData.get('password'),
    firstName: formData.get('first-name'),
    lastName: formData.get('last-name'),
  };

  try {
    const res = await axios.post(`${projectConfig.API_URL}/auth/signup`, user);

    if (res) {
      return {
        message: 'User signup successful!',
      };
    }
  } catch (e) {
    return {
      error: e.response?.data.message,
    };
  }
}
