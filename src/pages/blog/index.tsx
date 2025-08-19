import TableComponent from '@/components/TableComponent/index.js';
import { Eye, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BlogTable } from './blog.js';

const Blog = () => {
  const navigate = useNavigate();
  const columns = [
    {
      header : 'Blog ID',
      accessorKey: 'id',
    },
    {
      header: 'Title',
      accessorKey: 'title',
    },
 
    {
      header: 'Date',
      accessorKey: 'date',
    },
    {
      header : "Author",
      accessorKey: 'author',
    },
    {
      header: 'Action',
      accessorKey: 'action',
    }
  ]
  const action = [
    {
      header: 'View',
      accessorKey: 'view',
      icon: <Eye />,
      onClick: () => navigate('/blog/view')
    },
    {
      header: 'Edit',
      accessorKey: 'edit',
      icon: <Pencil />,
      onClick: () => navigate('/blog/edit')
    }
  ]
  return (
    <div className="p-8">
      <div className="rounded-lg border shadow-sm">
        <TableComponent
          columns={columns}
          data={BlogTable}
        />
      </div>
    </div>
  )
}

export default Blog
