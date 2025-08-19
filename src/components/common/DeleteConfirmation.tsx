

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

const TriggerDeleteConfirmation = ({
  children,
  confirmationMessage,
  deleteHandler,
}: {
  children: React.ReactNode;
  confirmationMessage: string;
  deleteHandler: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Are you sure! 🫥</DialogTitle>
          <DialogDescription>{confirmationMessage}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className='flex items-center gap-2'>
            <Button onClick={deleteHandler}>
              Confirm Delete
            </Button>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TriggerDeleteConfirmation;
