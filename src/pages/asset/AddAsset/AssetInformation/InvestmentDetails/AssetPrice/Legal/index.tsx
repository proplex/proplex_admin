import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFee } from '@/hooks/asset/useFee';
import { formConfig } from '../formConfig';
import AccordionComponent from './AccordionComponent';
import DialogComponent from './DialogComponent';
import DeleteDialogComponent from './DeleteDialogComponent';

const Index = () => {
  const { createFee, updateFee, deleteFee } = useFee();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: 'fees.legal',
    keyName: 'fr_id',
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    trigger(`fees.legal.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.fees.legal[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateFee(values._id, { ...values });
          }
          update(index ?? -1, { ...values });
        } else {
          await createFee({
            ...data,
            assetId: id ?? '',
            name: values.name ?? '',
            isPercentage: values.isPercentage ?? false,
            value: values.value ?? 0,
            type: 'legal',
            status: values.status ?? false,
          }).then((res) => {
            append({ ...values, _id: res._id });
          }
        );
        }
        setIndex(null);
        clearErrors();
      }
    });
  };

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.fees.legal[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteFee(values._id);
    }
  };

  const totalNumberOfSfts = formGetValues('totalNumberOfSfts');
  const pricePerSft = formGetValues('pricePerSft');

  return (
    <div className='flex flex-col w-full '>
      <div className='space-y-2 mt-2'>
        <AccordionComponent
          fields={fields}
          update={update}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
          handleAdd={handleAdd}
          totalNumberOfSfts={totalNumberOfSfts}
          pricePerSft={pricePerSft}
        />
      </div>
      <DialogComponent
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={formConfig}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
      <DeleteDialogComponent
        deleteIndex={deleteIndex}
        setDeleteIndex={setDeleteIndex}
        handleOnDelete={handleOnDelete}
      />
    </div>
  );
};

export default Index;
