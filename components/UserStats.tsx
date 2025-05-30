'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { HTMLAttributes, JSX } from 'react';

import silverhandImg from '@/assets/siverhand.jpg';
import { getUserStats } from '@/lib/api/games';

type UserStatsProps = {
  userId: string;
} & HTMLAttributes<HTMLDivElement>;

const StatsBlock = ({
  label,
  count,
}: {
  label: string;
  count: string;
}): JSX.Element => {
  return (
    <div className='flex flex-col items-center'>
      <span className='block text-lg font-light'>{label}:</span>
      <span className='block text-xl text-stone-300'>{count || 0}</span>
    </div>
  );
};

const UserStats = ({ userId, ...props }: UserStatsProps): JSX.Element => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['stats', userId],
    queryFn: ({ signal }) => getUserStats({ signal, id: userId }),
  });

  if (isLoading) {
    return <p className='mt-4'>Retrieving Stats...</p>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <>
      {data && (
        <div {...props}>
          <h1 className='font-heading text-darkgreen text-3xl font-bold'>
            Your Stats
          </h1>

          <div className='mt-4 flex flex-col justify-between gap-4 md:flex-row'>
            <div className='flex w-full flex-col rounded-sm border border-stone-700 bg-black/40 p-6'>
              <h3 className='font-heading mb-2 text-2xl text-stone-300'>
                All time
              </h3>
              <div className='grid grid-cols-3 gap-4'>
                <StatsBlock label='Games' count={data.all.total} />
                <StatsBlock label='Playing' count={data.all.playing} />
                <StatsBlock label='Completed' count={data.all.completed} />
                <StatsBlock label='Backlog' count={data.all.backlog} />
                <StatsBlock label='Wishlist' count={data.all.wishlist} />
              </div>
            </div>

            <div className='flex w-full flex-col rounded-sm border border-stone-700 bg-black/40 p-6'>
              <h3 className='font-heading mb-2 text-2xl text-stone-300'>
                Last 30 days
              </h3>
              <div className='grid grid-cols-3 gap-4'>
                <StatsBlock label='Games' count={data.last_30_days.total} />
                <StatsBlock label='Playing' count={data.last_30_days.playing} />
                <StatsBlock
                  label='Completed'
                  count={data.last_30_days.completed}
                />
                <StatsBlock label='Backlog' count={data.last_30_days.backlog} />
                <StatsBlock
                  label='Wishlist'
                  count={data.last_30_days.wishlist}
                />
              </div>
            </div>

            <div className='relative hidden w-full md:block'>
              <Image
                src={silverhandImg}
                alt='Image of Johnny Silverhand'
                fill
                className='rounded-sm object-cover'
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserStats;
