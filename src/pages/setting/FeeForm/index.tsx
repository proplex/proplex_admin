import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { postFee } from "@/store/features/feeManagementSlice";
import { formConfig } from "./formConfig";
import ControllerMap from '@/components/UseForm/ControllerMap';

interface FormData {
  name: string;
  projectTypes: string[]; // Allow multiple project types
  feesType: string;
  [key: `projectTypeDetail_${string}`]: string;
  [key: `percentage_${string}`]: string; // For percentage inputs
}

interface FeePercentageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeePercentageForm({
  isOpen,
  onClose,
}: FeePercentageProps) {
  const {
    control,
    setValue,
    getValues,
    watch,
    setError,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const propertyTypes = selectedProjectTypes.map((type) => ({
        value: type.toUpperCase(),
        label: type.toUpperCase(),
      }));

      const percentages = selectedProjectTypes.reduce((acc, projectType) => {
        const percentageField = data[`percentage_${projectType}`];
        if (percentageField) {
          acc[projectType] = percentageField;
        }
        return acc;
      }, {} as Record<string, string>);

      const resultAction = await dispatch(
        postFee({
          name: data.name,
          property_types: propertyTypes,
          FILM: selectedProjectTypes.includes("film")
            ? percentages["film"]
            : undefined,
          MUSIC: selectedProjectTypes.includes("music")
            ? percentages["music"]
            : undefined,
          BOOKS: selectedProjectTypes.includes("books")
            ? percentages["books"]
            : undefined,
          SPORTS: selectedProjectTypes.includes("sports")
            ? percentages["sports"]
            : undefined,
          WEBSERIES: selectedProjectTypes.includes("webseries")
            ? percentages["webseries"]
            : undefined,
          // @ts-ignore
          types: [{ value: data.feesType, label: data.feesType }],
        })
      );

      if (resultAction) {
        onClose();
      }
    } catch (error) {}
  };

  const selectedProjectTypes = watch("projectTypes", []);

  return (
    <div className='fixed inset-0 z-1 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        style={{
          maxHeight: '90vh',
          overflow: 'hidden',
        }}
        className='w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'
      >
        <h2 className='mb-4 text-lg font-semibold'>Fee Percentages</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='overflow-y-auto'
          style={{
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <div className='space-y-4 flex p-2 flex-col max-h-[80vh] overflow-auto'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm mb-3 font-medium text-gray-700'
              >
                Name
              </label>
              <Controller
                name='name'
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id='name'
                    className={errors.name ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.name && (
                <p className='text-sm '>{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='projectTypes'
                className='block text-sm mb-3 font-medium text-gray-700'
              >
                Project Types *
              </label>
              <Controller
                name='projectTypes'
                control={control}
                rules={{ required: 'At least one project type is required' }}
                render={({ field }) => (
                  <div className='flex flex-wrap gap-4'>
                    {['film', 'music', 'webseries', 'books', 'sports'].map(
                      (type) => (
                        <div key={type} className='flex  gap-2'>
                          <input
                            type='checkbox'
                            id={type}
                            value={type}
                            checked={field.value?.includes(type) || false}
                            onChange={(e) => {
                              const valueArray = field.value || [];
                              if (e.target.checked) {
                                field.onChange([...valueArray, e.target.value]);
                              } else {
                                field.onChange(
                                  valueArray.filter((v) => v !== e.target.value)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={type}
                            className='text-sm text-gray-700'
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                )}
              />
              {errors.projectTypes && (
                <p className='text-sm '>
                  {errors.projectTypes.message}
                </p>
              )}
            </div>

            {selectedProjectTypes.map((projectType) => (
              <div key={projectType}>
                <label
                  htmlFor={`percentage_${projectType}`}
                  className='block text-sm font-medium mb-3 text-gray-700'
                >
                  Percentage for {projectType}:
                </label>
                <Controller
                  name={`percentage_${projectType}`}
                  control={control}
                  rules={{
                    required: `Percentage for ${projectType} is required`,
                    pattern: {
                      value: /^[0-9]+(\.[0-9]{1,2})?$/,
                      message: 'Please enter a valid percentage',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id={`percentage_${projectType}`}
                      placeholder={`Enter percentage for ${projectType}`}
                      type='number'
                      className={
                        errors[`percentage_${projectType}`]
                          ? 'border-red-500'
                          : ''
                      }
                    />
                  )}
                />
                {errors[`percentage_${projectType}`] && (
                  <p className='text-sm '>
                    {errors[`percentage_${projectType}`]?.message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label
                htmlFor='feesType'
                className='block text-sm mb-3 font-medium text-gray-700'
              >
                Fees Type (Buy, Sell)
              </label>
              <Controller
                name='feesType'
                control={control}
                rules={{ required: 'Fees type is required' }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Buy'>Buy</SelectItem>
                      <SelectItem value='Sell'>Sell</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.feesType && (
                <p className='text-sm '>
                  {errors.feesType.message}
                </p>
              )}
            </div>

            <div className='flex mt-4 justify-end gap-2 '>
              <Button type='button' variant='outline' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit' className=''>
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
