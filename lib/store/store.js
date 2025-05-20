'use client';

import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/auth';
import userActionsReducer from './user-actions/userActions';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      userActions: userActionsReducer,
    },
  });
};
