import { createSlice } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

type InitialState = {
  user: null | User;
};

const initialState: InitialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
