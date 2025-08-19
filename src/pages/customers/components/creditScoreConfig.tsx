import React from "react";

type HeaderProps = {
  title: string;
  value?: any | null;
  color: string;
  Icon: any;
};

const CreditScoreConfig: React.FC<HeaderProps> = ({
  value=null,
  title,
  Icon,
  color,
}) => {
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm px-7 py-5 mb-6 flex justify-between items-center">
      <div>
        <span className="text-sm text-gray-400"> {title} </span>
        <h1 className="text-2xl font-bold"> {value ? value : "NA"} </h1>
      </div>
      <div
        className={`flex justify-center items-center text-${color}-700 bg-${color}-100 rounded-full h-10 w-10 `}
      >
        <Icon />
      </div>
    </div>
  );
};

export default CreditScoreConfig;
