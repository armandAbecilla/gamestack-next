'use client';

import { createPortal } from 'react-dom';
import { JSX, ReactNode, useEffect, useRef, useState } from 'react';

type ModalProps = {
  children: ReactNode;
  open?: boolean;
  onClose?: () => void;
  className?: string;
  modalInnerClassName?: string;
  closeOnClickOutside?: boolean;
};

const Modal = ({
  children,
  open,
  onClose,
  className = '',
  modalInnerClassName = '',
  closeOnClickOutside = false,
}: ModalProps): JSX.Element | null => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const innerContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.getElementById('modal');
    setModalRoot(root);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        innerContainer.current &&
        !innerContainer.current.contains(event.target) &&
        event.button === 0
      ) {
        onClose?.();
      }
    };

    if (open && closeOnClickOutside) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [open, closeOnClickOutside, onClose]);

  // prevent the user from scrolling the body if the modal is open(ed)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  if (!open || !modalRoot) return null;

  const dialogInnerClasses = `modal-inner ${modalInnerClassName || ''}`;

  return createPortal(
    <div className='modal-overlay'>
      <div className={`modal ${className}`}>
        <div ref={innerContainer} className={dialogInnerClasses}>
          {children}
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
