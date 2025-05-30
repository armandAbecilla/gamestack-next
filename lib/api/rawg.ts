import axios from 'axios';

import projectConfig from '@/config/config';

export const getTrendingGames = async () => {
  try {
    const response = await axios.get(
      `${projectConfig.RAWG_URL}/games?ordering=-added&key=${projectConfig.RAWG_KEY}`,
    );

    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message: e.message || 'Could not fetch from Rawg.io',
        }),
        { status: 500 },
      );
    } else {
      console.error('Unknown error:', e);
    }
  }
};
