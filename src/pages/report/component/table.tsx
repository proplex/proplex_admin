import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BadgeImage from "../../../../public/img/Badge-success-rounded.png";
import BadgeCancel from "../../../../public/img/Badge-delay.png";
interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

export function Table({ columns, data }: TableProps) {
  return (
    <UITable>
      <TableHeader className="text-left bg-gray-50">
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              <div className="flex flex-col items-center justify-center py-8">
                {/* <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="No data"
                  className="mb-4"
                /> */}
                <p className="text-gray-500">Please Refine Your Filter</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={
                    column.key === "type" ? "text-[#52c1b9] font-bold" : ""
                  }
                >
                  {column.key === "sto_sale_address" ? (
                    <div className="flex items-center justify-center">
                      {row.sto_sale_address != null ? (
                        <img
                          src={BadgeImage}
                          alt="Active Token"
                          className="w-6 h-6"
                        />
                      ) : (
                        <img
                          src={BadgeCancel}
                          alt="Inactive Token"
                          className="w-6 h-6"
                        />
                      )}
                    </div>
                  ) : (
                    row[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </UITable>
  );
}
