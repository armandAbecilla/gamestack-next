import { createSlice } from '@reduxjs/toolkit';

type initialState = {
  action: string | null;
};

const initialState: initialState = {
  action: null,
};

const userActionSlice = createSlice({
  name: 'userAction',
  initialState: initialState,
  reducers: {
    showEditNote(state) {
      state.action = 'editNote';
    },
    resetAction(state) {
      state.action = null;
    },
  },
});

export const userActions = userActionSlice.actions;

export default userActionSlice.reducer;
