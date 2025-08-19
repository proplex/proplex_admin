

import { Button } from '@/components/ui/button';
import {
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dialog, DialogHeader } from '@/components/ui/dialog';
import { DialogContent } from '@/components/ui/dialog';
import React from 'react';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { SubmitHandler } from 'react-hook-form';
import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

interface DialogConfigProps {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  form?: FormFieldConfig[];
  className?: string;
  onSubmit?: SubmitHandler<any>;
  methods?: any;
}

const DialogConfig = ({
  title,
  open,
  setOpen,
  form,
  className,
  onSubmit,
  methods,
}: DialogConfigProps) => {
  const handleSubmit = async (data: any) => {
    if (onSubmit) {
      await onSubmit(data);
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div>
            <form
              className={`${className} space-y-2 `}
              onSubmit={methods?.handleSubmit(handleSubmit)}
            >
              {form && FormGenerator(form)}
              <DialogFooter className='flex justify-end w-full mt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit' className='bg-primary text-white'>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogConfig;
