import { useParams } from 'next/navigation';
import { createContext, JSX, ReactNode, useContext } from 'react';

import { GameData, UserGameData } from '@/models/interfaces';

type GameLogContextObj = {
  gameData: GameData | null;
  userGameData: UserGameData | null;
  setStatus: (status: string) => void;
  setNotes: (notes: string) => void;
  setPlatform: (platform: string) => void;
};

export const GameLogContext = createContext<GameLogContextObj>({
  gameData: null,
  userGameData: null,
  setStatus: () => {},
  setNotes: () => {},
  setPlatform: () => {},
});

type GameLogProps = {
  selectedGameData: GameData | null;
  userGameData: UserGameData | null;
  children: ReactNode;
};

const GameLog = ({
  selectedGameData,
  userGameData,
  children,
}: GameLogProps): JSX.Element => {
  const params = useParams();

  const setStatus = (status: string): void => {
    console.log(status);
  };

  const setNotes = (notes: string): void => {
    console.log(notes);
  };

  const setPlatform = (platform: string): void => {
    console.log(platform);
  };

  const ctxValue = {
    selectedGameId: params.gameId,
    gameData: selectedGameData,
    userGameData: userGameData,
    setStatus,
    setNotes,
    setPlatform,
  };
  return (
    <GameLogContext.Provider value={ctxValue}>
      {children}
    </GameLogContext.Provider>
  );
};

export const useGameLog = () => {
  const ctx = useContext(GameLogContext);

  if (!ctx) {
    throw new Error('GameLog-related components must be wrapped by <GameLog>');
  }
};

export default GameLog;
