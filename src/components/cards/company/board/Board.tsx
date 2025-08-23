import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { FormProvider, useForm  } from 'react-hook-form';
import { Plus, Users, Info } from 'lucide-react';
import { formConfig } from './formConfig';
import { motion } from 'framer-motion';

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
                        <Users className="h-5 w-5 text-green-600" />
                        <h1 className='text-lg font-bold'>Board Member List</h1>
                    </div>
                    <Button size='sm' type='button' onClick={() => setOpen(true)} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        Add Board Member <Plus className='h-4 w-4 ml-2' />
                    </Button>
                </div>
            </motion.div>
            
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-2xl shadow-xl">
                    <DialogHeader className="mb-2">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <DialogTitle className='text-xl font-bold text-gray-900'>
                                    Add New Board Member
                                </DialogTitle>
                                <p className="text-gray-600 text-sm">
                                    Enter the details for the new board member
                                </p>
                            </div>
                        </div>
                    </DialogHeader>
                    
                    {/* Information Banner */}
                    <div className="bg-green-50 rounded-lg p-3 border border-green-100 mb-4">
                        <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-green-700">
                                Board members will have access to company records based on their permission level.
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
                                    <Button type='submit' className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'>
                                        Save Member
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

export default BoardMember;