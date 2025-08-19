

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PermissionType } from '@/types/role.types';
import { permissionDescriptions } from '@/utils/role.utils';

interface PermissionHeaderProps {
  permission: PermissionType;
  isAllSelected: boolean;
  onToggleAll: () => void;
}

export function PermissionHeader({
  permission,
  isAllSelected,
  onToggleAll,
}: PermissionHeaderProps) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='cursor-help'>
            {permission.name}
          </TooltipTrigger>
          <TooltipContent side='top'>
            <p>{permissionDescriptions[permission.id as keyof typeof permissionDescriptions]}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        variant='ghost'
        size='sm'
        onClick={onToggleAll}
        className='h-6 text-xs text-muted-foreground hover:text-foreground'
      >
        {isAllSelected ? 'All ✓' : 'All'}
      </Button>
    </div>
  );
}
