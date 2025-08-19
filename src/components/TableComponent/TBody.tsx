import { flexRender } from "@tanstack/react-table";
import Empty from "./Empty";
import { EMPTY_TABLE_DATA } from "@/constants/global";

interface TBodyProps {
  data: any[];
  model?: string;
}

const TBody: React.FC<TBodyProps> = ({ data, model }) => {
  const emptyData = EMPTY_TABLE_DATA.find((item) => item.id === model);
  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={100}>
            <Empty
              title={emptyData?.title || "No Data Available"}
              description={emptyData?.description || "No data found for this table."}
              icon={emptyData?.icon}
              actionButton={emptyData?.actionButton}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row: any) => (
        <tr key={row.id} className="hover:bg-gray-50">
          {row.getVisibleCells().map((cell: any) => (
            <td
              key={cell.id}
              className="p-2 border-b text-sm"
              style={{ maxWidth: cell.column.getSize() }}
            >
              <div className="truncate">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;
