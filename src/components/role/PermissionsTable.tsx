

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { Category, Permissions } from '@/types/role.types';
import { permissionTypes } from '@/utils/role.utils';
import { CategoryActions } from './CategoryActions';
import { PermissionHeader } from './PermissionHeader';

interface PermissionsTableProps {
  categories: Category[];
  permissions: Permissions;
  onPermissionChange: (categoryId: string, permissionId: string) => void;
  onSelectAllForCategory: (categoryId: string) => void;
  onSelectAllForPermission: (permissionId: string) => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
}

export function PermissionsTable({
  categories,
  permissions,
  onPermissionChange,
  onSelectAllForCategory,
  onSelectAllForPermission,
  onEditCategory,
  onDeleteCategory,
}: PermissionsTableProps) {
  return (
    <div className='rounded-md border overflow-hidden'>
      <table className='w-full'>
        <thead>
          <tr className='bg-muted/50'>
            <th className='text-left p-3 font-medium'>Category</th>
            {permissionTypes.map((permission) => (
              <th
                key={permission.id}
                className='text-center p-3 font-medium w-24'
              >
                <PermissionHeader
                  permission={{
                    id: permission?.id,
                    name: permission.name,
                  }}
                  isAllSelected={Object.keys(permissions).every(
                    (categoryId) =>
                      permissions[categoryId][
                        permission.id as keyof Permissions[typeof categoryId]
                      ] === true
                  )}
                  onToggleAll={() => onSelectAllForPermission(permission.id)}
                />
              </th>
            ))}
            <th className='text-center p-3 font-medium w-24'>All</th>
            <th className='text-center p-3 font-medium w-24'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td
                colSpan={permissionTypes.length + 3}
                className='p-8 text-center text-muted-foreground'
              >
                No categories defined. Click "Add Category" to create one.
              </td>
            </tr>
          ) : (
            categories.map((category, index) => (
              <tr
                key={category.id}
                className={
                  index % 2 === 0
                    ? 'bg-background'
                    : 'bg-muted/20 hover:bg-muted/30'
                }
              >
                <td className='p-3 font-medium'>{category.name}</td>
                {permissionTypes.map((permission) => (
                  <td
                    key={`${category.id}-${permission.id}`}
                    className='text-center p-3'
                  >
                    <div className='flex justify-center'>
                      <Switch
                        id={`${category.id}-${permission.id}`}
                        checked={
                          permissions[category.id]?.[
                            permission.id as keyof Permissions[typeof category.id]
                          ] || false
                        }
                        onCheckedChange={() =>
                          onPermissionChange(category.id, permission.id)
                        }
                        className='data-[state=checked]:bg-primary'
                      />
                    </div>
                  </td>
                ))}
                <td className='text-center p-3'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => onSelectAllForCategory(category.id)}
                    className='h-8 w-8 p-0'
                  >
                    {Object.values(permissions[category.id]).every(
                      (value) => value === true
                    ) ? (
                      <Check className='h-4 w-4' />
                    ) : (
                      <span className='text-xs'>All</span>
                    )}
                  </Button>
                </td>
                <td className='text-center p-3'>
                  <CategoryActions
                    category={category}
                    onEdit={onEditCategory}
                    onDelete={onDeleteCategory}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
