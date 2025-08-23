import { useState } from 'react';
import { formConfig } from './formConfig';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { DialogHeader } from '@/components/ui/CustomDialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { Button } from '@/components/ui/button';
import { useAmenityApi } from '@/hooks/asset/useAmenity';
import AmenityTable from '@/pages/asset/AddAsset/FeaturesAndAmenities/Amenity/AmenityTable';
import { getAmenitiesForCategory } from '../categoryAmenitiesFeatures';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Sparkles } from 'lucide-react';

const TenantManagement = () => {
  const { createAmenity, updateAmenity, deleteAmenity } = useAmenityApi();
  const { id } = useParams<{ id: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
    watch,
  } = useFormContext();

  // Watch for category changes to show relevant amenities
  const category = watch('category');
  const suggestedAmenities = category ? getAmenitiesForCategory(category) : [];

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: 'amenities',
    keyName: 'amenities_id',
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
  };

  const handleQuickAdd = async (amenity: any) => {
    const data = {
      name: amenity.label,
      description: amenity.description || `${amenity.label} - Premium amenity`,
      status: true,
      image: '',
    };
    
    if (id) {
      await createAmenity({ ...data, assetId: id }).then((res) => {
        append({ ...data, _id: res._id });
      });
    } else {
      append(data);
    }
  };

  const handleEdit = (item: any) => {
    const findIndex = fields.findIndex(
      (field) => field.amenities_id === item.amenities_id
    );
    setIndex(findIndex);
  };

  const handleDelete = (item: any) => {
    const findIndex = fields.findIndex(
      (field) => field.amenities_id === item.amenities_id
    );
    setDeleteIndex(findIndex);
  };

  const onSubmit = async () => {
    trigger(`amenities.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.amenities[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            const { name, description, image, status } = values;
            await updateAmenity(values._id, {
              name,
              description,
              image,
              status,
            });
          }
          update(index ?? -1, { ...values });
        } else {
          const data = {
            name: values.name,
            description: values.description,
            status: values.status,
            image: values.image,
          };
          await createAmenity({ ...data, assetId: id }).then((res) => {
            append({ ...data, _id: res._id });
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
    const values = data.amenities[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      await deleteAmenity(values?._id);
      remove(deleteIndex);
    }
  };

  const mappedFields = fields.map((field:any) => ({
    amenities_id: field.amenities_id,
    name: field.name ?? '',
    description: field.description ?? '',
    image: field.image ?? '',
    status: field.status ?? false,
  }));

  return (
    <div className='flex flex-col w-full space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-bold text-gray-800'>Amenities</h1>
        <Button
          type='button'
          className='text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2'
          onClick={handleAdd}
        >
          <Plus className='w-4 h-4' />
          <span>Add Custom Amenity</span>
        </Button>
      </div>

      {/* Suggested Amenities for Category */}
      {suggestedAmenities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Sparkles className='w-5 h-5 text-blue-500' />
              Suggested Amenities for This Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {suggestedAmenities.map((amenity) => {
                const alreadyAdded = fields.some(
                  (field: any) => field.name?.toLowerCase() === amenity.label.toLowerCase()
                );
                
                return (
                  <div
                    key={amenity.id}
                    className={`p-3 border rounded-lg transition-all duration-200 ${
                      alreadyAdded
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer'
                    }`}
                    onClick={() => !alreadyAdded && handleQuickAdd(amenity)}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-sm text-gray-900'>
                          {amenity.label}
                        </h3>
                        {amenity.description && (
                          <p className='text-xs text-gray-600 mt-1'>
                            {amenity.description}
                          </p>
                        )}
                      </div>
                      <div className='ml-2'>
                        {alreadyAdded ? (
                          <Badge variant='secondary' className='text-xs bg-green-100 text-green-700'>
                            Added
                          </Badge>
                        ) : (
                          <Plus className='w-4 h-4 text-gray-400' />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className='space-y-2'>
        <AmenityTable data={mappedFields} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className=''>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Edit' : 'Add'} Amenity</DialogTitle>
          </DialogHeader>
          <div className='space-y-2'>
            <div className='grid gap-4'>
              {FormGenerator(formConfig(index ?? -1))}
            </div>
            <DialogFooter className='flex justify-end w-full'>
              <Button type='button' variant='outline' onClick={onOpenChange}>
                Cancel
              </Button>
              <Button type='button' onClick={onSubmit}>
                Submit
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteIndex !== null}
        onOpenChange={() => setDeleteIndex(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-lg font-bold p-2'>
              Delete Amenity
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <p>Are you sure you want to delete this Amenity?</p>
            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setDeleteIndex(null)}
              >
                Cancel
              </Button>
              <Button type='button' onClick={handleOnDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantManagement;
