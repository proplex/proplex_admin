import TableComponent from "@/components/TableComponent";
import { useOrder } from "@/hooks/order/useOrder";
import { useEffect } from "react";

const Index = ({ order }: { order: any }) => {
  const { getDocuments, documents } = useOrder();
  useEffect(() => {
    getDocuments({ order });
  }, [order]);

  const columns = [
    {
      header: "Document Name",
      accessorKey: "documentName",
    },
    {
      header:"Sent At",
      accessorKey: "sentAt",
      cell: (info: any) => {
        const date = info.getValue() || null
        if (date) {
          const formattedDate = new Date(date);
          return formattedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        return "Not Sent";       
      }
    },
    {
      header: "Uploaded At",
      accessorKey: "createdAt",
      cell: (info: any) => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <TableComponent columns={columns} data={documents} />
    </div>
  );
};
export default Index;
