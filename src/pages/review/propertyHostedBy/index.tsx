
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil } from 'lucide-react';
import TableComponent from '@/components/TableComponent';

const App = () => {
  const navigate = useNavigate();

  const columns = [
    { header: 'REVIEW ID', accessorKey: 'review_id' },
    { header: 'PROPERTY ID', accessorKey: 'property_id' },
    { header: 'REVIEWER NAME', accessorKey: 'reviewer_name' },
    { header: 'STATUS', accessorKey: 'status' },
    { header: 'COMMENT', accessorKey: 'comment' },
    { header: 'CREATED', accessorKey: 'created' },
  ];
  

  const data = [
    {
      review_id: '1',
      property_id: '1',
      reviewer_name: 'John Doe',
      status: 'Pending',
      comment: 'Comment',
      created: '2021-01-01',
    },
  ];
  
 
  const action = [
    {
      header: 'View',
      accessorKey: 'view',
      icon: <Eye className="text-gray-600" />,
      onClick: () => navigate('/'),
    },
    {
      header: 'Edit',
      accessorKey: 'edit',
      icon: <Pencil className="text-gray-600" />,
      onClick: () => navigate('/'),
    },
  ];

 
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Property Hosted By</h1>
      <div className="rounded-lg border shadow-sm">
        <TableComponent
          columns={columns}
          data={data}
       
        />
      </div>
    </div>
  );
};

export default App;