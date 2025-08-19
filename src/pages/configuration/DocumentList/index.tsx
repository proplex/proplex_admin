import { Button } from "@/components/ui/button";
import TableComponent from "@/components/TableComponent";
import { Edit } from "lucide-react";
const index = () => {
  const columns = [
    {
      header: "Document Name",
      accessorKey: "documentName",
    },
    {
      header: "No of Docs",
      accessorKey: "noOfDocs",
    },
    {
      header: "Action",
      accessorKey: "action",
    },
  ];
  const data = [
    {
      documentName: "Andaman and Nicobar Islands",
      noOfDocs: 10,
    },
    {
      documentName: "Arunachal Pradesh",
      noOfDocs: 10,
    },
    {
      documentName: "Assam",
      noOfDocs: 10,
    },
    {
      documentName: "Bihar",
      noOfDocs: 10,
    },
    {
      documentName: "Chandigarh",
      noOfDocs: 10,
    },
    {
      documentName: "Andhra Pradesh",
      noOfDocs: 10,
    },
    {
      documentName: "Telangana",
      noOfDocs: 10,
    },
  ];
  const action = [
    {
      header: "Edit",
      accessorKey: "edit",
      icon: <Edit />,
      onClick: () => {
        console.log("Edit");
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Document List</h1>
        <Button>Add Document</Button>
      </div>
      <div className="mt-4 max-h-[300px] overflow-y-auto">
        <TableComponent columns={columns} data={data} model="document" />
      </div>
    </div>
  );
};

export default index;
