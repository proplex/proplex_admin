import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

type Column = {
  header: string;
  accessorKey: string;
  cell?: (info: any) => React.ReactNode;
};

interface TableComponentProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  model?: string;
}

export const TableComponent = ({
  columns,
  data = [],
  isLoading = false,
  model = '',
}: TableComponentProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500">No {model} found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={row._id || rowIndex}>
              {columns.map((column) => (
                <TableCell key={`${row._id || rowIndex}-${column.accessorKey}`}>
                  {column.cell
                    ? column.cell({ getValue: () => row[column.accessorKey], row })
                    : String(row[column.accessorKey] || '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
