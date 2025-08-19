

import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

// Types for the item data
export interface ContentItem {
  id: number | string;
  title: string;
  description: string;
}

interface TableContentProps<T extends ContentItem> {
  title: string;
  addButtonText: string;
  items: any[];
  onAddItem: () => void;
  onEditItem: (id: number) => void;
  onDeleteItem: (id: T['id']) => void;
  emptyStateMessage?: string;
}

export function TableContent<T extends ContentItem>({
  title = 'List',
  addButtonText = 'Add Item',
  items = [],
  onAddItem,
  onEditItem,
  onDeleteItem,
  emptyStateMessage = 'No items found',
}: TableContentProps<T>) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <Button
          onClick={onAddItem}
          type='button'
          className='bg-black text-white rounded-md'
        >
          <PlusCircle className='mr-2 h-4 w-4' />
          {addButtonText}
        </Button>
      </div>

      <div className='space-y-4'>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className='border rounded-md overflow-hidden'>
              <div className='flex items-center justify-between p-4 bg-white'>
                <h3 className='text-lg font-medium'>
                  {index + 1}. {item.question || item.title || item.name}
                </h3>
                <div className='flex space-x-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    type='button'
                    onClick={() => onDeleteItem(index)}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <Trash2 className='h-5 w-5' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    type='button'
                    onClick={() => onEditItem(index)}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <Edit className='h-5 w-5' />
                  </Button>
                </div>
              </div>
              <div className='p-4 bg-white border-t'>
                <p className='text-gray-700'>
                  {item.answer || item.description || item.value}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center py-8 text-gray-500'>
            <p>{emptyStateMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
