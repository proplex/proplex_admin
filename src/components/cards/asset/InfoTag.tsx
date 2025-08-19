import React from "react";

interface InfoTagProps {
  info: string;
  amount: string;
  icon: React.ReactNode;
}

const InfoTag = ({ info, amount, icon }: InfoTagProps) => {
  return (
    <div>
      <div
        className={
          " bg-slate-200  rounded-md py-3 mt-5 w-full justify-between items-center flex px-2 text-sm font-medium "
        }
      >
        <div className=" flex items-center gap-2">
          <span className="text-white text-[16px] bg-blue-500 rounded-lg p-1">
            {icon}
          </span>

          <span className="text-black font-medium">{info}</span>
        </div>
        <span className="text-black font-bold">{amount}</span>
      </div>
    </div>
  );
};

export default InfoTag;
