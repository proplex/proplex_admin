



import type React from 'react';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  className,
  titleClassName,
  contentClassName,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('border border-border rounded-md', className)}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between px-4 py-3 font-medium text-lg',
          titleClassName
        )}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className='h-5 w-5 text-muted-foreground' />
        ) : (
          <ChevronDown className='h-5 w-5 text-muted-foreground' />
        )}
      </button>
      {isOpen && (
        <div className={cn('px-4 pb-4', contentClassName)}>{children}</div>
      )}
    </div>
  );
}
