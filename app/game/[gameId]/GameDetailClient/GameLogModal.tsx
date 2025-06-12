import { JSX } from 'react';

import Modal from '@/components/UI/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI/tabs';
// import { GameData, UserGameData } from '@/models/interfaces';

type GameLogModalProps = {
  open: boolean;
  // gameData: GameData | null;
  // userGameData: UserGameData | null;
};

const GameLogModal = ({ open }: GameLogModalProps): JSX.Element => {
  return (
    <Modal className='m-auto max-w-lg' open={open}>
      <Tabs defaultValue='userLogs'>
        <TabsList className='before:bg-border relative h-auto w-full justify-start gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px'>
          <TabsTrigger
            value='userLogs'
            className='bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:bg-black/60 data-[state=active]:text-stone-300 data-[state=active]:shadow-none'
          >
            User Logs
          </TabsTrigger>
          <TabsTrigger
            value='notes'
            className='bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:bg-black/60 data-[state=active]:text-stone-300 data-[state=active]:shadow-none'
          >
            Notes
          </TabsTrigger>
        </TabsList>
        <TabsContent value='userLogs'>
          <p className='text-muted-foreground p-4 text-center text-xs'>
            Content for Tab 1
          </p>
        </TabsContent>
        <TabsContent value='notes'>
          <p className='text-muted-foreground p-4 text-center text-xs'>
            Content for Tab 2
          </p>
        </TabsContent>
      </Tabs>
    </Modal>
  );
};

export default GameLogModal;
