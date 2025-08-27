import React, { useState } from 'react';
import get from 'lodash/get';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';
import { Upload, Check, FileIcon, X, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FileUploadProps {
  name: string;
  label: string;
  accept?: string[];
  maxSize?: number;
  className?: string;
  rules?: RegisterOptions;
  meta?: {
    refId: string;
    belongsTo: string;
    isPublic: boolean;
  };
}

function FileUploadController({
  name,
  label,
  accept = [],
  maxSize,
  className,
  rules,
  meta,
}: FileUploadProps) {
  const {
    setValue,
    watch,
    control,
    formState: { errors },
    setError,
  } = useFormContext();
  const values = watch(name);
  const file = values?.name;
  const fileUrl = values?.url;
  const fileObject = values?.fileObject; // Store the actual file object

  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void
  ) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Validate file size if maxSize is provided
    if (maxSize && selectedFile.size > maxSize) {
      setError(
        name,
        {
          type: 'manual',
          message: `File size exceeds the limit of ${maxSize / 1024 / 1024} MB`,
        },
        { shouldFocus: true }
      );
      return;
    }
    
    // Validate file type
    const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    const isValidFileType = accept.some((type) => {
      if (type === '*') return true;
      if (type.startsWith('.')) return type === fileExtension;
      if (type.includes('/*')) {
        const baseType = type.split('/')[0];
        return selectedFile.type.startsWith(baseType);
      }
      return type === selectedFile.type;
    });
    
    if (!isValidFileType) {
      setError(
        name,
        {
          type: 'manual',
          message: `Invalid file type. Accepted types: ${accept.join(', ')}`,
        },
        { shouldFocus: true }
      );
      return;
    }

    try {
      setIsUploading(true);
      
      // Upload to Cloudinary
      const result = await uploadToCloudinary(selectedFile, `proplex/${name}`);
      
      // Set the form value with Cloudinary file info
      const fileData = {
        name: selectedFile.name,
        url: result.secure_url,
        publicId: result.public_id,
        type: selectedFile.type,
        size: selectedFile.size,
      };
      
      setValue(name, fileData);
      onChange(fileData);
      
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      setError(name, {
        type: 'manual',
        message: 'Failed to upload file. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async (onChange: (value: null) => void) => {
    try {
      // If there's a publicId, delete the file from Cloudinary
      if (values?.publicId) {
        await fetch(`/api/cloudinary/delete?publicId=${encodeURIComponent(values.publicId)}`, {
          method: 'DELETE',
        });
      }
      
      // Clean up the object URL to prevent memory leaks
      if (fileUrl && fileUrl.startsWith('blob:')) {
        URL.revokeObjectURL(fileUrl);
      }
      
      setValue(
        name,
        {
          name: null,
          url: null,
          publicId: null,
          fileObject: null,
        },
        {
          shouldValidate: true,
        }
      );
      onChange(null);
      
      toast.success('File removed successfully');
    } catch (error) {
      console.error('Error removing file:', error);
      toast.error('Failed to remove file');
    }
  };

  const description = `Accepts: ${accept?.map((ext) => `${ext}`).join(', ')}${
    maxSize ? ` (Max size: ${maxSize / 1024 / 1024} MB)` : ''
  }`;

  const error = get(errors, name)?.message as string;

  return (
    <div className={cn(className)}>
      <div className='flex items-center justify-between'>
        <label
          htmlFor={name}
          className={cn('text-sm font-medium', error && 'text-destructive')}
        >
          {label}
          {rules?.required && <span className='ml-1 text-destructive'>*</span>}
        </label>

        <span className='text-xs text-muted-foreground'>{description}</span>
      </div>

      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={null}
        render={({ field: { onChange } }) => (
          <div className='relative'>
            <div
              className={cn(
                'flex items-center gap-4 border rounded-lg p-3 w-full',
                errors[name] && 'border-destructive',
                error && 'border-destructive'
              )}
            >
              <div className='flex flex-1 items-center gap-2 min-w-0'>
                {file ? (
                  <>
                    <Check className='h-5 w-5 flex-shrink-0 text-green-500' />
                    <span className='truncate text-sm'>{file}</span>
                    {fileUrl && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={fileUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-primary hover:text-primary/80 transition-colors'
                              aria-label='Preview file'
                            >
                              <ExternalLink className='h-4 w-4' />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Preview file</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </>
                ) : (
                  <>
                    <FileIcon className='h-5 w-5 flex-shrink-0 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>
                      No file selected
                    </span>
                  </>
                )}
              </div>

              <div className='flex items-center gap-2'>
                {file ? (
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => handleRemove(onChange)}
                    className='h-8 px-2'
                  >
                    <X className='h-4 w-4 mr-1' />
                    <span className='sr-only md:not-sr-only md:inline'>
                      Remove
                    </span>
                  </Button>
                ) : null}

                <Button
                  type='button'
                  variant='secondary'
                  size='sm'
                  className='h-8 min-w-[80px]'
                  disabled={isUploading}
                  asChild
                >
                  <label htmlFor={`file-${name}`} className='cursor-pointer'>
                    {isUploading ? (
                      <>
                        <Loader2 className='h-4 w-4 mr-1 animate-spin' />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className='h-4 w-4 mr-1' />
                        <span>{file ? 'Replace' : 'Upload'}</span>
                      </>
                    )}
                  </label>
                </Button>

                <input
                  type='file'
                  className='sr-only'
                  id={`file-${name}`}
                  accept={accept?.map((ext) => ext.startsWith('.') || ext.includes('/') ? ext : `.${ext}`).join(',')}
                  onChange={(e) => handleFileChange(e, onChange)}
                  aria-describedby={`${name}-error`}
                />
              </div>
            </div>
            {error && (
              <p id={`${name}-error`} className='text-sm text-destructive mt-1'>
                {error}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default FileUploadController;