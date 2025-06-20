'use client';

import { DateValue } from '@internationalized/date';
import { CalendarIcon } from 'lucide-react';
import { JSX } from 'react';
import {
  Button,
  DatePicker,
  Dialog,
  Group,
  Label,
  Popover,
} from 'react-aria-components';

import { Calendar } from '@/components/UI/calendar-rac';
import { DateInput } from '@/components/UI/datefield-rac';

type CustomDatePickerProps = {
  label: string;
  onDateSelect: (date: DateValue | null) => void;
  className?: string;
  value?: DateValue | null;
  required?: boolean;
};
const CustomDatePicker = ({
  label,
  onDateSelect,
  className,
  value,
  required,
}: CustomDatePickerProps): JSX.Element => {
  return (
    <DatePicker
      className={`*:not-first:mt-2 ${className}`}
      onChange={(e: DateValue | null) => onDateSelect(e)}
      value={value}
      aria-labelledby={label}
      isRequired={required}
    >
      <Label className='text-stone-300'>{label}</Label>
      <div className='flex'>
        <Group className='w-full'>
          <DateInput className='pe-9' />
        </Group>
        <Button className='text-muted-foreground/80 hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]'>
          <CalendarIcon size={16} />
        </Button>
      </div>
      <Popover
        className='bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-lg border shadow-lg outline-hidden'
        offset={4}
      >
        <Dialog className='max-h-[inherit] overflow-auto p-2'>
          <Calendar />
        </Dialog>
      </Popover>
    </DatePicker>
  );
};

export default CustomDatePicker;
