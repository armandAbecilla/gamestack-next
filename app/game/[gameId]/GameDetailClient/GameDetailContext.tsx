'use client';
import {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/lib/store/store';
import { GameData, UserGameData } from '@/models/interfaces';

import {
  useMutateAddToLibrary,
  useMutateRemoveFromLibrary,
  useMutateUpdateUserGameData,
  useUserGameData,
} from './hooks';

type GameDetailContextObj = {
  isUserGameDataUpdating: boolean;
  gameUpdateSuccess: boolean;
  addToLibrary: (gameData: GameData) => void;
  removeFromLibrary: () => void;
  setStatus: (status: string) => void;
  setNotes: (notes: string) => void;
  setPlatform: (platform: string) => void;
};

export const GameDetailContext = createContext<GameDetailContextObj>({
  isUserGameDataUpdating: false,
  gameUpdateSuccess: false,
  addToLibrary: () => {},
  removeFromLibrary: () => {},
  setStatus: () => {},
  setNotes: () => {},
  setPlatform: () => {},
});

type GameDetailProps = {
  gameId: string;
  children: ReactNode;
};

export const GameDetailProvider = ({
  gameId,
  children,
}: GameDetailProps): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;
  const [userGameData, setUserGameData] = useState<UserGameData | null>(null);
  const userGameKey = ['userGame', gameId, userId]; // keys for queryKey

  //hooks
  const { data: fetchedUserGameData } = useUserGameData(gameId, userId);
  const { mutate: mutateAddToLibrary } = useMutateAddToLibrary(userGameKey);
  const { mutate: mutateRemoveFromLibrary } =
    useMutateRemoveFromLibrary(userGameKey);
  const {
    mutate: mutateUpdateUserGameData,
    isPending: isUserGameDataUpdating,
    isSuccess: gameUpdateSuccess,
  } = useMutateUpdateUserGameData(userGameKey);

  useEffect(() => {
    // set the states on initial load, loaded from react query hooks
    setUserGameData(fetchedUserGameData);
  }, [fetchedUserGameData]);

  const addToLibrary = (gameData: GameData) => {
    if (!userGameData && gameData) {
      mutateAddToLibrary({
        data: {
          userId: userId ? userId : '',
          rawgGameId: gameId,
          rawgGameTitle: gameData.name,
          notes: '',
          status: '',
        },
      });
    }
  };

  const removeFromLibrary = () => {
    // if action == remove from library
    if (userGameData) {
      mutateRemoveFromLibrary({ id: userGameData.id });
    }
  };

  const setStatus = (status: string): void => {
    if (userGameData) {
      mutateUpdateUserGameData({
        id: userGameData.id,
        gameData: {
          ...userGameData,
          status,
        },
      });
    }
  };

  const setNotes = (updatedNote: string): void => {
    if (userGameData) {
      mutateUpdateUserGameData({
        id: userGameData.id,
        gameData: {
          ...userGameData,
          notes: updatedNote,
        },
      });
    }
  };

  const setPlatform = (platform: string): void => {
    if (userGameData) {
      mutateUpdateUserGameData({
        id: userGameData.id,
        gameData: {
          ...userGameData,
          platform: platform,
        },
      });
    }
  };

  const ctxValue: GameDetailContextObj = {
    isUserGameDataUpdating,
    gameUpdateSuccess,
    addToLibrary,
    removeFromLibrary,
    setStatus,
    setNotes,
    setPlatform,
  };

  return (
    <GameDetailContext.Provider value={ctxValue}>
      {children}
    </GameDetailContext.Provider>
  );
};

export const useGameDetailClient = () => {
  const ctx = useContext(GameDetailContext);

  if (!ctx) {
    throw new Error(
      'GameDetail-related components must be wrapped by <GameDetail>',
    );
  }

  return ctx;
};

export default GameDetailContext;
