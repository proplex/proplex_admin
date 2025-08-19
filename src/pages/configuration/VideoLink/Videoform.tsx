import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addVideoLink } from '@/store/features/videoSlice';
import { AppDispatch } from '@/store/store';
import { formConfig } from './formConfig';
import FormGenerator from '@/components/UseForm/FormGenerator';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  type: string;
  description: string;
  link: string;
}

export default function CustomFormModal({ isOpen, onClose }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { reset, handleSubmit, control } = useForm<any>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await dispatch(
        addVideoLink({
          type: data.type,
          link: data.link,
          description: data.description,
        })
      ).unwrap();
      toast.success('Video link added successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to add video link. Please try again.');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'>
            <h2 className='mb-4 text-lg font-semibold'>Add New Video Link</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              {FormGenerator(formConfig())}
              <div className='flex justify-end gap-2'>
                <Button type='button' variant='outline' onClick={onClose}>
                  Cancel
                </Button>
                <Button type='submit' className=''>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
