import { JSX } from 'react';

import { GameDetailProvider } from './GameDetailContext';
import GameDetails from './GameDetails';

const GameDetailClient = ({ gameId }: { gameId: string }): JSX.Element => {
  return (
    <GameDetailProvider gameId={gameId}>
      <GameDetails />
    </GameDetailProvider>
  );
};

export default GameDetailClient;
