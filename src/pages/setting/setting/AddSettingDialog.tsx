import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { Button } from '@/components/ui/button'
import FormGenerator from '@/components/UseForm/FormGenerator'
import { formConfig } from './formConfig'
import { useForm, FormProvider } from 'react-hook-form'


const AddSettingDialog = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const methods = useForm({
    values: {
      name: '', 
      value: '',
    },
  });
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent>

            <DialogTitle>Add New Setting            </DialogTitle>
          <FormProvider {...methods}>
            <form className='space-y-4'>
              {FormGenerator(formConfig(methods.control))}
              <div className='flex justify-end gap-2'>
                <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type='submit' className=''>
                  Save
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddSettingDialog