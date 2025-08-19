import { User, Verified } from "lucide-react";
import React from "react";
import { title } from "process";
import DocumentCard from "../Documents/DocumentCard";
export const documentdata = [
  {
    title: "PAN CARD",
    Verified: true,
    time: "12 Jun 2023",
    status: "Verified",
  },
  {
    title: "AADHAR CARD",
    Verified: true,
    time: "12 Jun 2023",
    status: "Verified",
  },
  {
    title: "Bank Statement",
    Verified: false,
    time: "12 Jun 2023",
    status: "Pending",
  },
];
const DocumentsTab = () => {
  return (
    <>
      <div className="p-4 border-gray-300 border rounded-lg">
        <h1 className="text-2xl font-bold">Documents</h1>
        <p className="text-gray-500">
          Customer's uploaded documents and verification status
        </p>
        <div className="mt-4 w-full grid grid-cols-3 gap-4">
          {/* <DocumentCard/> */}
          {documentdata.map((item) => {
            return (
              <DocumentCard
                title={item.title}
                Verified={item.Verified}
                time={item.time}
                status={item.status}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DocumentsTab;
