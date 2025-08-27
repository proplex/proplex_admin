import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { FormProvider, useForm  } from 'react-hook-form';
import { Plus, CreditCard, Info } from 'lucide-react';
import { formConfig } from './formConfig';
import { motion } from 'framer-motion';

const AddAccount = () => {
    const [open, setOpen] = useState(false);
    const methods = useForm({
        defaultValues: {
            accountHolderName: '',
            accountNumber: '',
            ifscCode: '',
            category: '',
            additionalInformation: '',
        },
    });
    
    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <motion.div 
                className='flex flex-col gap-4'
                initial="hidden"
                animate="visible"
                variants={itemVariants}
            >
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <h1 className='text-lg font-bold'>Bank Account List</h1>
                    </div>
                    <Button size='sm' type='button' onClick={() => setOpen(true)} className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-sm">
                        Add Bank Account <Plus className='h-4 w-4 ml-2' />
                    </Button>
                </div>
            </motion.div>
            
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-2xl shadow-xl">
                    <DialogHeader className="mb-2">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <CreditCard className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                                <DialogTitle className='text-xl font-bold text-gray-900'>
                                    Add New Bank Account
                                </DialogTitle>
                                <p className="text-gray-600 text-sm">
                                    Enter the details for the new bank account
                                </p>
                            </div>
                        </div>
                    </DialogHeader>
                    
                    {/* Information Banner */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-4">
                        <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">
                                All bank accounts must be verified before they can be used for transactions.
                            </p>
                        </div>
                    </div>
                    
                    <DialogDescription>
                        <FormProvider {...methods}>
                            <form className='space-y-4'>
                                <motion.div 
                                    className="space-y-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {FormGenerator(formConfig(methods.control))}
                                </motion.div>
                                <div className='flex justify-end gap-3 pt-2'>
                                    <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type='submit' className='bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-sm'>
                                        Save Account
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default AddAccount;