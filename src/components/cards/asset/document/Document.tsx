import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { FormProvider, useForm  } from 'react-hook-form';
import { formConfig } from './formConfig';
import { Plus } from 'lucide-react';
const Document = () => {
    const [open, setOpen] = useState(false);
    const methods = useForm({
        defaultValues: {
            type: '',
            documentId: '',
            file: '',
        },
    });
    return (
        <>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg font-bold'>Documents</h1>
                    <Button size='sm'  type='button' onClick={() => setOpen(true)}>Upload <Plus className='h-4 w-4' /></Button>
                </div>

            </div>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-lg font-bold p-2'>Upload Document</DialogTitle>
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

export default Document;