'use client';

import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/auth';
import userActionsReducer from './user-actions/userActions';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userActions: userActionsReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
