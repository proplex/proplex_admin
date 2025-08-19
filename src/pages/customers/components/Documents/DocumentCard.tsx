import { User } from "lucide-react";
import React from "react";
type document = {
  title: string;
  Verified: boolean;
  time: string;
  status: string;
};
const DocumentCard = ({ title, Verified, time, status }: document) => {
  return (
    <>
      <div className="h-[15rem] border-2 w-full border-[#E2E8F0] border-dashed rounded-lg flex flex-col items-center justify-center">
        <div className="h-[50px] w-[50px] flex items-center justify-center bg-[#E2E8F0] rounded-full text-[#3b82f6] ">
          <User size="28px" />
        </div>
        <h1 className="font-semibold mt-2">{title}</h1>
        <p className="text-gray-500">
          {Verified ? "Verified" : "Uploaded"} on {time}
        </p>
        <span className="w-20 mt-3 border border-[#e2e8f0] rounded-full text-center font-semibold ">
          {status}
        </span>
      </div>
    </>
  );
};

export default DocumentCard;
