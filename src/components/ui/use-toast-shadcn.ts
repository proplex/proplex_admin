import toast from 'react-hot-toast';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useToast() {
  const showToast = ({
    title,
    description,
    variant = 'default',
    duration = 4000,
  }: ToastProps) => {
    const message = description || title || '';
    
    if (variant === 'destructive') {
      return toast.error(message, {
        duration,
        position: 'top-right',
      });
    } else {
      return toast.success(message, {
        duration,
        position: 'top-right',
      });
    }
  };

  return {
    toast: showToast,
    success: (message: string, duration?: number) => 
      toast.success(message, { duration: duration || 4000, position: 'top-right' }),
    error: (message: string, duration?: number) => 
      toast.error(message, { duration: duration || 4000, position: 'top-right' }),
    loading: (message: string) => 
      toast.loading(message, { position: 'top-right' }),
    dismiss: (toastId?: string) => 
      toast.dismiss(toastId),
  };
}