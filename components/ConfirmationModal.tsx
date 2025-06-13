import { JSX, ReactNode } from 'react';

import Button from './UI/Button';
import Modal from './UI/Modal';

type ConfirmationModalProps = {
  open: boolean;
  children?: ReactNode;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal = ({
  open = false,
  children,
  title,
  onClose,
  onConfirm,
  onCancel,
}: ConfirmationModalProps): JSX.Element => {
  return (
    <Modal onClose={onClose} open={open} className='max-w-[400px]!'>
      <p className='text-lg'>{title}</p>
      <div className='py-5'>{children}</div>
      <div className='mt-4 flex justify-end gap-4'>
        <Button type='button' textOnly onClick={onCancel}>
          Cancel
        </Button>
        <Button className='bg-red-600 hover:bg-red-500' onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
