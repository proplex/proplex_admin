

import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Category } from '@/types/role.types';

interface CategoryActionsProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryActions({
  category,
  onEdit,
  onDelete,
}: CategoryActionsProps) {
  return (
    <div className='flex items-center justify-center gap-1'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => onEdit(category)}
        className='h-8 w-8'
      >
        <Edit2 className='h-4 w-4' />
      </Button>
      <Button
        size='icon'
        variant='outline'
        onClick={() => onDelete(category)}
        className='h-8 w-8 text-destructive hover:text-destructive'
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
  );
}
