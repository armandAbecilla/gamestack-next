'use client';

import { useParams } from 'next/navigation';
import { JSX } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI/tabs';

import GameOverview from './GameOverview';
import GameSessions from './GameSessions';
import { useGameDetail } from './hooks';

const GameDetails = (): JSX.Element => {
  const { gameId } = useParams();
  const { data: gameData } = useGameDetail(gameId as string);

  const tabsTriggerClassname =
    'data-[state=active]:border-darkgreen border-b-2 overflow-hidden rounded-t-none rounded-b-none border-b-transparent py-2 data-[state=active]:z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-stone-400 data-[state=active]:text-white';

  return (
    <div>
      <h1 className='font-heading mb-5 text-3xl xl:text-5xl'>
        {gameData?.name}
      </h1>
      <Tabs defaultValue='overview'>
        <TabsList className='h-auto w-full justify-start gap-0.5 bg-transparent p-0'>
          <TabsTrigger value='overview' className={tabsTriggerClassname}>
            Overview
          </TabsTrigger>
          <TabsTrigger value='sessions' className={tabsTriggerClassname}>
            Game Sessions
          </TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <GameOverview />
        </TabsContent>
        <TabsContent value='sessions'>
          <GameSessions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameDetails;
