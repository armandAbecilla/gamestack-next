// import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import GameDetailsSkeleton from '@/components/skeleton-loaders/GameDetails';
// import queryClient from '@/lib/api';
import { fetchGameDetails } from '@/lib/api/games';
import { createClient } from '@/lib/supabase/server';

import GameDetailClient from './GameDetailClient/GameDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const gameData = await fetchGameDetails({ gameId: gameId, readOnly: true });

  if (!gameData) {
    notFound();
  }

  return {
    title: gameData.name,
    description: gameData.summary,
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { gameId } = await params;

  if (!user) {
    redirect('/login');
  }

  return (
    <Suspense fallback={<GameDetailsSkeleton />}>
      <GameDetailClient gameId={gameId} />
    </Suspense>
  );

  // Keep this code for reference on how to use Hydration with prefetchQuery

  // await queryClient.prefetchQuery({
  //   queryKey: ['selectedGame', gameId],
  //   queryFn: ({ signal }) => fetchGameDetails({ signal, gameId: gameId }),
  // });

  // const dehydratedState = dehydrate(queryClient);

  // return (
  //   <HydrationBoundary state={dehydratedState}>
  //    <GameDetailClient gameId={gameId} />
  //   </HydrationBoundary>
  // );
}
