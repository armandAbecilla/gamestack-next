'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { JSX, ReactNode, useState } from 'react';

import CaretDown from '@/components/Icons/CaretDown';
import CaretUp from '@/components/Icons/CaretUp';

type AccordionProps = {
  label: string;
  isOpen: boolean;
  children: ReactNode;
  className?: string;
};

const Accordion = ({
  label,
  isOpen,
  children,
  className,
}: AccordionProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(!isOpen);

  const handleToggleCollapse = (): void => {
    setIsCollapsed((prevState) => !prevState);
  };

  const caretClasses = 'w-[12px] text-stone-200';

  return (
    <div className={className}>
      <button
        className='flex w-full cursor-pointer items-center justify-between hover:opacity-90'
        onClick={handleToggleCollapse}
      >
        {label}

        {isCollapsed ? (
          <CaretDown className={caretClasses} />
        ) : (
          <CaretUp className={caretClasses} />
        )}
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            className='mt-2 overflow-hidden'
            key='content' // do i need this??
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
