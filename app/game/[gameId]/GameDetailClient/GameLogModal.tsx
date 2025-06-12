import { JSX } from 'react';

import Modal from '@/components/UI/Modal';
// import { GameData, UserGameData } from '@/models/interfaces';

type GameLogModalProps = {
  open: boolean;
  // gameData: GameData | null;
  // userGameData: UserGameData | null;
};

const GameLogModal = ({ open }: GameLogModalProps): JSX.Element => {
  return (
    <Modal className='m-auto max-w-lg' open={open}>
      <h1>tanginaasdasd</h1>
    </Modal>
  );
};

export default GameLogModal;
