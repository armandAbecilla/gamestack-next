import projectConfig from '@/config/config'; // environment variable
import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserGameData } from '@/models/interfaces';

const MAX_PAGE_SIZE = 25;

export const fetchUserGames = createAsyncThunk(
  'games/fetchUserGames',
  async (
    {
      userId,
      status,
      page = 1,
      limit = MAX_PAGE_SIZE,
    }: { userId: string; status: string; page: number; limit: number },
    thunkAPI,
  ) => {
    try {
      let url = `${projectConfig.API_URL}/games/user/${userId}?page=${page}&limit=${limit}`;

      if (status) {
        url += '&status=' + status;
      }

      const response = await axios.get(url);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Failed to fetch games');
    }
  },
);

export const updateUserGameData = createAsyncThunk(
  'games/upateNotes',
  async (
    { id, gameData }: { id: number; gameData: UserGameData },
    thunkAPI,
  ) => {
    try {
      const response = await axios.patch(
        `${projectConfig.API_URL}/games/${id}`,
        gameData,
      );

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Failed to update data.');
    }
  },
);
