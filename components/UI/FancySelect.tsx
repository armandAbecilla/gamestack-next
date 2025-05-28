'use client';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useRef, useState, useLayoutEffect, useEffect, JSX } from 'react';
import { createPortal } from 'react-dom';

import { FancySelectOption } from '@/models/types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
      staggerDirection: -1, // Animate children bottom-to-top
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function getOptionClassNames(
  options: FancySelectOption[],
  selectOption: FancySelectOption,
): string {
  return (
    options.find((opt) => opt.value === selectOption?.value)?.classNames || ''
  );
}

type FancySelectProps = {
  placeholderValue?: string;
  options: FancySelectOption[];
  dropdownPosition?: 'top' | 'bottom';
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
  disabled?: boolean;
};

const FancySelect = ({
  placeholderValue = 'Please Select',
  options,
  dropdownPosition = 'top',
  defaultValue,
  value,
  onChange,
  name,
  disabled,
}: FancySelectProps): JSX.Element => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [internalSelected, setInternalSelected] = useState(
    defaultValue || null,
  );

  const selected = value ? value : internalSelected; // gamit na gamit to sa conditions natin later
  const selectedLabel = options.find((opt) => opt.value === selected)?.label; // for displaying label for the button
  const isControlled = value !== undefined; // whether if this was used as control value (using onChange ) or not
  // derive css styles for selected based on the selected value
  const selectedClasess =
    options.find((i) => i.value === selected)?.classNames ||
    options[0].classNames;
  const disabledClasses = disabled ? 'pointer-events-none' : '';
  // filter options to exclude selected value from the options
  const filteredOptions = [...options].filter((opt) => opt.value !== selected);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function handleSelect(selectedValue: string | number) {
    if (onChange) {
      onChange(selectedValue);
    }
    if (!isControlled) {
      setInternalSelected(selectedValue);
    }
    setIsOpen(false);
  }

  // Recalculate dropdown position
  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      setDropdownStyle({
        position: 'fixed',
        top: dropdownPosition === 'top' ? rect.top - 8 : rect.bottom,
        transform: dropdownPosition === 'top' ? 'translateY(-100%)' : 'none',
        left: rect.left + scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen, dropdownPosition]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !dropdownContainerRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close if trigger moves or window resizes, or when user scrolls while the options are displayed
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const prevRect = triggerRef.current.getBoundingClientRect();

    const checkPositionChange = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const moved =
          rect.top !== prevRect.top ||
          rect.left !== prevRect.left ||
          rect.width !== prevRect.width ||
          rect.height !== prevRect.height;

        if (moved) setIsOpen(false); // close the select kapag hindi na sila matched
      }
    };

    const interval = setInterval(checkPositionChange, 100);
    const handleResize = () => setIsOpen(false);

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        type='button'
        className={`w-max min-w-fit cursor-pointer rounded-full border border-stone-700/50 px-5 py-1 text-left backdrop-blur-md ${selectedClasess} ${disabledClasses}`}
      >
        {selectedLabel || placeholderValue}
      </button>

      {name && selected && <input type='hidden' name={name} value={selected} />}

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id='dropdownContainer'
              style={dropdownStyle}
              ref={dropdownContainerRef}
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={containerVariants}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {filteredOptions.map((opt) => (
                <motion.div
                  key={opt.value}
                  variants={itemVariants}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-max min-w-fit cursor-pointer rounded-full px-5 py-1 text-left backdrop-blur-md not-first:mt-1 ${getOptionClassNames(options, opt)}`}
                >
                  {opt.label}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default FancySelect;
