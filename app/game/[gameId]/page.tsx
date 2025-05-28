import queryClient from '@/lib/api';
import GameDetailClient from './GameDetailClient';
import { notFound } from 'next/navigation';
import { fetchGameDetails } from '@/lib/api/games';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

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
    data: { session },
  } = await supabase.auth.getSession();
  const { gameId } = await params;

  // if no session then redirect to homepage
  if (!session) {
    redirect('/login');
  }

  await queryClient.prefetchQuery({
    queryKey: ['selectedGame', gameId],
    queryFn: ({ signal }) => fetchGameDetails({ signal, gameId: gameId }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <GameDetailClient gameId={gameId} />
    </HydrationBoundary>
  );
}
