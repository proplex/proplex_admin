import TableComponent from "@/components/TableComponent";
import Pagination from "@/layout/Pagination";

const InvestorTable = ({
  columns,
  data,
  pagination,
  onPageChange,
  onPageSizeChange,
}: any) => {
  return (
    <div className="space-y-4">
      <TableComponent columns={columns} data={data || []} model="investor" />
      <Pagination
        {...pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default InvestorTable;
