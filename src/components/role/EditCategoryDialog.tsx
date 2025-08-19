

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/types/role.types';

interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onUpdate: (id: string, name: string) => void;
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  category,
  onUpdate,
}: EditCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  const handleUpdate = () => {
    if (categoryName.trim() && category) {
      onUpdate(category.id, categoryName);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the name of this permission category
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Label htmlFor='edit-category' className='mb-2 block'>
            Category Name
          </Label>
          <Input
            id='edit-category'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder='Enter category name'
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
