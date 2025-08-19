import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { FormProvider, useForm  } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { formConfig } from './formConfig';
const BoardMember = () => {
    const [open, setOpen] = useState(false);
    const methods = useForm({
        defaultValues: {
            name: '',
            email: '',
            title: '',
            permissionLevel: '',
            status: '',
            hasDscDin: '',
            relevantDocument: '',
        },
    });
    return (
        <>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg font-bold'>          
                        Board Member List


                    </h1>
                    <Button size='sm'  type='button' onClick={() => setOpen(true)}> Add Board Member <Plus className='h-4 w-4' /></Button>
                </div>

            </div>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-lg font-bold p-2'>
                                Add New Board Member

                        </DialogTitle>
                        <DialogDescription>
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
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>

    )
};

export default BoardMember;