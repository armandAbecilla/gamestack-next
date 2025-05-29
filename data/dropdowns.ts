import { Status, TimeUnitOption } from '@/models/types';

export const statusOptions: {
  label: string;
  value: Status;
  classNames: string;
}[] = [
  { label: 'Playing', value: 'playing', classNames: 'bg-playing text-black' },
  { label: 'Backlog', value: 'backlog', classNames: 'bg-backlog text-white' },
  {
    label: 'Completed',
    value: 'completed',
    classNames: 'bg-darkgreen text-white',
  },
  {
    label: 'Wishlist',
    value: 'wishlist',
    classNames: 'bg-wishlist text-stone-800',
  },
];

export const timeUnitOptions: TimeUnitOption[] = [
  {
    label: 'This Week',
    value: 'this_week',
  },
  {
    label: 'Last 30 days',
    value: 'last_30_days',
  },
  {
    label: 'This month',
    value: 'this_month',
  },
  {
    label: 'This year',
    value: 'this_year',
  },
];
