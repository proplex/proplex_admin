

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Info, Plus, Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Category, Permissions } from '@/types/role.types';
import {
  createSlugId,
  defaultCategories,
  defaultPermissions,
  initializePermissions,
  mockRoles,
  toggleAllCategoriesForPermission,
  toggleAllPermissionsForCategory,
  togglePermission,
} from '@/utils/role.utils';
import { PermissionsTable } from '@/components/role/PermissionsTable';
import { AddCategoryDialog } from '@/components/role/AddCategoryDialog';
import { EditCategoryDialog } from '@/components/role/EditCategoryDialog';
import { DeleteCategoryDialog } from '@/components/role/DeleteCategoryDialog';

export default function RoleForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== 'new';

  // Form state
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [permissions, setPermissions] =
    useState<Permissions>(defaultPermissions);

  // Dialog states
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  // Load role data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const role = mockRoles.find((r) => r.id === id);
      if (role) {
        setRoleName(role.name);
        setRoleDescription(role.description || '');
        setPermissions(role.permissions);
      }
    }
  }, [id, isEditMode]);

  // Permission handlers
  const handlePermissionChange = (categoryId: string, permissionId: string) => {
    setPermissions(
      togglePermission(permissions, categoryId, permissionId as any)
    );
  };

  const handleSelectAllForCategory = (categoryId: string) => {
    setPermissions(toggleAllPermissionsForCategory(permissions, categoryId));
  };

  const handleSelectAllForPermission = (permissionId: string) => {
    setPermissions(
      toggleAllCategoriesForPermission(permissions, permissionId as any)
    );
  };

  // Category handlers
  const handleAddCategory = (name: string) => {
    const id = createSlugId(name);

    // Check if category with this ID already exists
    if (categories.some((cat) => cat.id === id)) {
      alert('A category with a similar name already exists');
      return;
    }

    // Add new category
    setCategories([...categories, { id, name }]);

    // Initialize permissions for this category
    setPermissions({
      ...permissions,
      [id]: initializePermissions(id),
    });

    setShowAddDialog(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowEditDialog(true);
  };

  const handleUpdateCategory = (id: string, name: string) => {
    setCategories(
      categories.map((cat) => (cat.id === id ? { ...cat, name } : cat))
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteDialog(true);
  };

  const confirmDeleteCategory = () => {
    if (!categoryToDelete) return;

    // Remove the category
    setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id));

    // Remove permissions for this category
    const { [categoryToDelete.id]: removed, ...updatedPermissions } =
      permissions;
    setPermissions(updatedPermissions);

    setCategoryToDelete(null);
    setShowDeleteDialog(false);
  };

  const handleSubmit = () => {
    // Here you would typically save the role data to your backend
    // For now, we'll just simulate a successful save and redirect

    // Redirect back to the roles list
    navigate('/roles');
  };

  return (
    <div className='container mx-auto p-8'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>
          {isEditMode ? 'Edit Role' : 'Create New Role'}
        </h1>
      </div>

      <Card className='shadow-sm'>
        <CardHeader className='pb-6'>
          <CardTitle className='text-2xl font-bold'>Role Details</CardTitle>
          <CardDescription>Define the role and its permissions</CardDescription>
        </CardHeader>
        <CardContent className='space-y-8'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='role-name' className='text-base font-medium'>
                Role Name
              </Label>
              <Input
                id='role-name'
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className='max-w-md'
                placeholder='Enter role name'
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='role-description'
                className='text-base font-medium'
              >
                Description
              </Label>
              <Textarea
                id='role-description'
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                className='max-w-md'
                placeholder='Brief description of this role'
                rows={3}
              />
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <h3 className='text-lg font-medium'>Permissions</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Info className='h-4 w-4' />
                        <span className='sr-only'>Permission information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='max-w-xs'>
                        Configure what actions this role can perform across
                        different sections
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Button
                size='sm'
                className='flex items-center gap-1'
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className='h-4 w-4' />
                Add Category
              </Button>
            </div>

            <PermissionsTable
              categories={categories}
              permissions={permissions}
              onPermissionChange={handlePermissionChange}
              onSelectAllForCategory={handleSelectAllForCategory}
              onSelectAllForPermission={handleSelectAllForPermission}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </div>
        </CardContent>
        <CardFooter className='flex justify-between border-t p-6'>
          <Button variant='outline' onClick={() => navigate('/roles')}>
            Cancel
          </Button>
          <Button
            className='flex items-center gap-2'
            onClick={handleSubmit}
            disabled={!roleName.trim()}
          >
            <Save className='h-4 w-4' />
            {isEditMode ? 'Update Role' : 'Create Role'}
          </Button>
        </CardFooter>
      </Card>

      {/* Dialogs */}
      <AddCategoryDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddCategory}
      />

      <EditCategoryDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        category={editingCategory}
        onUpdate={handleUpdateCategory}
      />

      <DeleteCategoryDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        category={categoryToDelete}
        onDelete={confirmDeleteCategory}
      />
    </div>
  );
}
