import React from 'react';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from '@/components/ui/table';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { convertDateAndTimeToLocal } from '@/helpers/global';
import { Button } from '@/components/ui/button';
import AddMemeber from './AddMember';
import { Pencil, Trash2, User, Users, Calendar, Phone, Mail } from 'lucide-react';
import useDeleteCompanyMember from '@/hooks/useDeleteCompanyMember';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const { control } = useFormContext();
  const [index, setIndex] = React.useState<any>(null);
  const { id: companyId } = useParams<{ id: string }>();
  const [deleteMember, setDeleteMember] = React.useState<any>(null);
  const { deleteCompanyMember, loading: deleteLoading } =
    useDeleteCompanyMember();
  const { fields, remove, update, append } = useFieldArray({
    control,
    name: 'LLPBoardMembers',
    keyName: 'board_member_id',
  });

  const handleMember = (id?: number) => {
    if (id !== undefined && id > -1) {
      setIndex(id);
    } else {
      setIndex(-1);
    }
  };

  const closeDeleteModal = () => {
    setDeleteMember(null);
  };

  const handleDeleteMember = () => {
    if (companyId) {
      deleteCompanyMember(deleteMember.id, Number(companyId));
      remove(fields.findIndex((item: any) => item.id === deleteMember.id));
      closeDeleteModal();
    } else {
      return null;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AddMemeber
        update={update}
        append={append}
        fields={fields}
        index={index}
        setIndex={setIndex}
      />
      <Dialog open={deleteMember} onOpenChange={closeDeleteModal}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl shadow-xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Delete Board Member
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <p className="text-red-700">
                Are you sure you want to delete this board member? This will permanently remove all associated data.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteMember} 
                disabled={deleteLoading}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteLoading ? 'Deleting...' : 'Delete Member'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Main Content */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Board Members List</h2>
            <p className="text-gray-600 text-sm mt-1">
              {fields.length} board member{fields.length !== 1 ? 's' : ''} added
            </p>
          </div>
          <Button 
            onClick={() => handleMember()} 
            type="button"
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-sm"
          >
            Add Board Member
          </Button>
        </div>
        
        {/* Information Cards */}
        
        <div className="px-6 pb-6">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-medium text-gray-700 w-16">Sl No</TableHead>
                  <TableHead className="font-medium text-gray-700">Name</TableHead>
                  <TableHead className="font-medium text-gray-700">Email</TableHead>
                  <TableHead className="font-medium text-gray-700">Phone</TableHead>
                  <TableHead className="font-medium text-gray-700">Updated On</TableHead>
                  <TableHead className="font-medium text-gray-700 w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.length > 0 ? (
                  fields.map((item: any, i) => (
                    <TableRow key={i} className="hover:bg-gray-50">
                      <TableCell className="py-3 font-medium">{i + 1}</TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{item.name || '-'}</span>
                            {item.dsc_din && (
                              <p className="text-xs text-gray-500 mt-0.5">DIN: {item.dsc_din}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{item.email || '-'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{item.phone_number || '-'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-gray-600">
                        {convertDateAndTimeToLocal(item.updated_at)}
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => {
                              setIndex(i);
                            }}
                            className="border-gray-300 hover:bg-gray-100"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => {
                              setDeleteMember(item);
                            }}
                            className="border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="w-12 h-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-500 mb-1">No Board Members</h3>
                        <p className="text-gray-400 mb-4">Get started by adding a new board member</p>
                        <Button 
                          onClick={() => handleMember()} 
                          type="button"
                          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-sm"
                        >
                          Add Board Member
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;