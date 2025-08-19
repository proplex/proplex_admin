

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>) => {
  const isHorizontal = orientation === 'horizontal';
  const separatorClass = cn(
    'shrink-0 bg-border',
    isHorizontal ? 'h-[1px] w-full' : 'h-full w-[1px]',
    className
  );

  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={separatorClass}
      {...props}
    />
  );
};

Separator.displayName = 'Separator';

export { Separator };
