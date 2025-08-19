

import type React from 'react';
import get from 'lodash/get';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';
import { Upload, Check, FileIcon, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useSinglePresignedUrl from '@/hooks/file/useSinglePresignedUrl';
import useSingleFileUpload from '@/hooks/file/useSingleFileUpload';
import useGetSingleFileUrl from '@/hooks/file/useGetSingleFileUrl';

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
  const { getSinglePresignedUrl } = useSinglePresignedUrl();
  const { uploadFile } = useSingleFileUpload();
  const { getFileUrl } = useGetSingleFileUrl();
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

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void
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
    await getSinglePresignedUrl({
      fileName: selectedFile.name,
      mimeType: selectedFile.type,
      fileSize: selectedFile.size,
      refId: meta?.refId || '',
      belongsTo: meta?.belongsTo || '',
      isPubilc: meta?.isPublic || false,
    }).then(async (res) => {
      await uploadFile({ url: res.uploadUrl, file: selectedFile }).then(
        async (r) => {
          if (r.status === 200) {
            await getFileUrl(res.savedS3Object._id).then((fileReponse) => {
              setValue(name, {
                name: selectedFile.name,
                url: fileReponse.s3Url,
              });
            });
          }
        }
      );
    });
    // onChange(selectedFile);
  };

  const handleRemove = (onChange: (value: null) => void) => {
    setValue(
      name,
      {
        name: null,
        url: null,
      },
      {
        shouldValidate: true,
      }
    );
    onChange(null);
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
                  className='h-8'
                  asChild
                >
                  <label htmlFor={`file-${name}`} className='cursor-pointer'>
                    <Upload className='h-4 w-4 mr-1' />
                    <span>{file ? 'Replace' : 'Upload'}</span>
                  </label>
                </Button>

                <input
                  type='file'
                  className='sr-only'
                  id={`file-${name}`}
                  accept={accept?.map((ext) => `.${ext}`).join(',')}
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
