import { useRef, type ChangeEvent, type DragEvent } from 'react';
import get from 'lodash/get';
import { X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

interface MultiImageUploaderProps {
  name: string;
  label: string;
  accept?: string[];
  rules?: any;
  disabled?: boolean;
  maxSize?: number;
  meta?: {
    refId: string;
    belongsTo: string;
    isPublic: boolean;
  };
}

export default function MultiImageUploader({
  label = 'Featured Images',
  name,
  accept = [],
  rules,
  disabled = false,
  maxSize = 5 * 1024 * 1024,
  meta,
}: MultiImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    setError,
    control,
    formState: { errors },
    clearErrors,
    watch,
    setValue,
  } = useFormContext();

  const files: { name: string; url: string; fileObject: File }[] = watch(name) || [];

  const error = get(errors, name)?.message as string;

  const processFiles = (selectedFiles: File[]) => {
    // Validate each file
    for (const file of selectedFiles) {
      // Validate file type
      const isValidFileType = accept.some((type) => {
        if (type === '*') return true;
        if (type.startsWith('.')) {
          const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
          return type === fileExtension;
        }
        if (type.includes('/*')) {
          const baseType = type.split('/')[0];
          return file.type.startsWith(baseType);
        }
        return type === file.type;
      });
      
      if (!isValidFileType) {
        setError(name, {
          type: 'manual',
          message: `Unsupported format. Allowed: ${accept.join(', ')}`,
        });
        return;
      }

      if (file.size > maxSize) {
        setError(name, {
          type: 'manual',
          message: `File exceeds ${maxSize / 1024 / 1024} MB`,
        });
        return;
      }
    }

    // Create local URLs for the files
    const newFiles = selectedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      fileObject: file,
    }));

    setValue(name, [...files, ...newFiles]);
    clearErrors(name);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearErrors(name);
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearErrors(name);
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    processFiles(droppedFiles);
  };

  const removeImage = (index: number) => {
    // Clean up the object URL to prevent memory leaks
    const fileToRemove = files[index];
    if (fileToRemove && fileToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    
    const updated = [...files];
    updated.splice(index, 1);
    setValue(name, updated);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className={cn('text-sm font-medium', error && 'text-destructive')}
      >
        {label} {rules?.required && <span className="ml-1">*</span>}
      </label>

      <div className="grid gap-4">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={() => (
            <div
              className={cn(
                'h-32 border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors',
                error && 'border-destructive'
              )}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={accept.map((ext) => ext.startsWith('.') || ext.includes('/') ? ext : `.${ext}`).join(',')}
                className="hidden"
                multiple
                disabled={disabled}
              />
              <Upload className="h-10 w-10 mb-2 text-gray-400" />
              <p className="text-sm text-center">Drag & drop or click to upload</p>
              <p className="text-xs text-muted-foreground">
                Max: {maxSize / 1024 / 1024}MB | Formats: {accept.join(', ')}
              </p>
            </div>
          )}
        />
        {error && (
          <p id={`${name}-error`} className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.length > 0 ? (
            files.map((fileObj, index) => (
              <div key={index} className="relative border rounded-md h-32 overflow-hidden">
                <img src={fileObj.url} alt={`Uploaded ${index}`} className="w-full h-full object-contain" />
                <button
                  type="button"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-md col-span-full">
              <p className="text-sm text-gray-500">No images uploaded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}