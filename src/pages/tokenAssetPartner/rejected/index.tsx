import TableComponent from "@/components/TableComponent";

const index = () => {
  const columns = [
    {
      header: "Partner Name",
      accessorKey: "partnerName",
    },
    {
      header: "Asset Name",
      accessorKey: "assetName",
    },
    {
      header: "Asset ID",
      accessorKey: "assetId",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];
  const data = [
    {
      partnerName: "Partner Name",
      assetName: "Asset Name",
      assetId: "Asset ID",
      createdAt: "Created At",
      status: "Status",
    },
  ];

  return (
    <div className="border border-gray-200 rounded-md">
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default index;
