import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPartners, postPartner, updatedPartner } from "@/store/features/partnerSlice";
import { toast } from "react-hot-toast";
import Loading from "@/components/ui/Loading";
import Pagination from "@/layout/Pagination";
import PartnerForm from "./index";

const AdminDashboard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<{
    id?: number;
    name: string;
    icon: string;
  } | null>(null);
  const { partners, loading, pagination } = useAppSelector(
    (state) => state.partners
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPartners({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(fetchPartners({ page, limit: pagination?.pageSize }));
  };

  const handleOpenModal = (partner: any = null) => {
    setSelectedPartner(partner);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPartner(null);
  };
  const handleSubmit = async (partnerData: { name: string; icon: string }) => {
    try {
      if (selectedPartner?.id) {
        await dispatch(updatedPartner({ id: selectedPartner.id, ...partnerData }));
        toast.success("Partner updated successfully!");
      } else {
        await dispatch(postPartner(partnerData));
        toast.success("Partner added successfully!");
      }
      setModalOpen(false);
      dispatch(fetchPartners({ page: 1, limit: pagination?.pageSize }));
    } catch (error) {
      toast.error("Failed to save partner. Please try again!");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='p-6 space-y-8'>
      <section className='space-y-4'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-xl text-gray-800'>List Of Partners</h1>
          <Button
            className=' flex items-center'
            onClick={() => handleOpenModal()}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add New PARTNERS
          </Button>
        </div>

        <div className='rounded-lg border bg-white overflow-x-auto'>
          <Table className='bg-white-100 rounded-lg border'>
            <TableHeader className='text-left bg-gray-50'>
              <TableRow>
                <TableHead>Partners</TableHead>
                <TableHead>Images</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners && Array.isArray(partners) && partners.length > 0 ? (
                partners.map((partner) => (
                  <TableRow key={partner.id} className='hover:bg-gray-50'>
                    <TableCell>{partner.name}</TableCell>
                    <TableCell>
                      {partner.icon ? (
                        <img
                          src={partner.icon}
                          alt={`${partner.name || 'Partner'} Logo`}
                          className='w-5 h-5 object-contain'
                        />
                      ) : (
                        'No Image'
                      )}
                    </TableCell>
                    <TableCell>
                      <button
                        className='text-gray-400 hover:text-gray-600'
                        onClick={() => handleOpenModal(partner)}
                      >
                        <Pencil className='w-5 h-5' />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className='text-center'>
                    No partners available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* {pagination && pagination.totalItems > 0 && (
          <Pagination pager={pagination} onPageChange={handlePageChange} />
        )} */}
      </section>

      <PartnerForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        partner={selectedPartner}
      />
    </div>
  );
};

export default AdminDashboard;
