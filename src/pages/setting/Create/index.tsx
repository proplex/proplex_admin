

import { Button } from '@/components/ui/button';
import {
  editSetting,
  postSetting,
  resetEditMode,
} from '@/store/features/settingSlice';
import { AppDispatch } from '@/store/store';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { formConfig } from './formConfig';
import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import FormGenerator from '@/components/UseForm/FormGenerator';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  value: string;
}

function Index({ isOpen, onClose }: ModalProps) {
  const { settingToEdit, isEditMode } = useAppSelector(
    (state) => state.setting
  );
  useEffect(() => {}, [isEditMode]);
  const dispatch = useDispatch<AppDispatch>();
  const { control, setValue, watch, clearErrors, handleSubmit } =
    useForm<FormData>({
      values: settingToEdit,
    });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (isEditMode) {
        const resultAction = await dispatch(
          editSetting({
            settingIdToBeUpdated: settingToEdit.id,
            data: { name: data.name, value: data.value },
          })
        );
        if (editSetting.fulfilled.match(resultAction)) {
          dispatch(resetEditMode());
          onClose();
        } else {
        }
        return;
      }
      const resultAction = await dispatch(
        postSetting({ name: data.name, value: data.value })
      );
      if (postSetting.fulfilled.match(resultAction)) {
        dispatch(resetEditMode());
        onClose();
      } else {
      }
    } catch (error) {}
  };

  if (!isOpen) return null;

  return (
    <div>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'>
            <h2 className='mb-4 text-lg font-semibold'>Settings</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              {FormGenerator(
                formConfig({ watch, setValue, control, clearErrors })
              )}
              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={async () => {
                    await dispatch(resetEditMode());
                    onClose();
                  }}
                >
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
export default Index;