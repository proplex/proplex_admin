



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, PenSquare, Plus, Search, Trash } from 'lucide-react';
import type { Role } from '@/types/role.types';
import { mockRoles } from '@/utils/role.utils';
import { DeleteRoleDialog } from '@/components/role/DeleteRoleDialog';

export default function RolesList() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const filteredRoles = roles;

  const handleEditRole = (roleId: string) => {
    navigate(`/roles/${roleId}`);
  };

  const handleDeleteRole = (role: Role) => {
    setRoleToDelete(role);
    setShowDeleteDialog(true);
  };

  const confirmDeleteRole = () => {
    if (!roleToDelete) return;

    // Remove the role
    setRoles(roles.filter((role) => role.id !== roleToDelete.id));

    setRoleToDelete(null);
    setShowDeleteDialog(false);
  };

  // Mock function to count users with this role (would be replaced with real data)
  const getUserCount = (roleId: string) => {
    const counts: Record<string, number> = {
      '1': 6,
      '2': 104616,
      '3': 1,
      '4': 44,
      '5': 0,
    };
    return counts[roleId] || 0;
  };

  return (
    <div className='container mx-auto py-8 max-w-6xl'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Role List</h1>
        <Button onClick={() => navigate('/roles/new')}>
          <Plus className='h-4 w-4' />
          Create New Role
        </Button>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader className='bg-gray-200'>
            <TableRow>
              <TableHead className='font-medium'>ID</TableHead>
              <TableHead className='font-medium'>ROLE NAME</TableHead>
              <TableHead className='font-medium'>NUMBER OF USER</TableHead>
              <TableHead className='text-right font-medium'>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className='h-24 text-center'>
                  No roles found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRoles.map((role) => (
                <TableRow key={role.id} className='border-t border-gray-200'>
                  <TableCell>{role.id}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{getUserCount(role.id)}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handleEditRole(role.id)}
                        className='h-8 w-8 p-2'
                      >
                        <Edit className='h-5 w-5' />
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handleDeleteRole(role)}
                        className='h-8 w-8 p-2'
                      >
                        <Trash className='h-5 w-5' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteRoleDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        role={roleToDelete}
        onDelete={confirmDeleteRole}
      />
    </div>
  );
}
