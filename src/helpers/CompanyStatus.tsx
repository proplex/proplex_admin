import React, { useState } from "react";
import { Switch } from "@radix-ui/react-switch";
import { useAppDispatch } from "@/store/hooks";
import { updateStatus } from "@/store/features/companySlice";

const CompanyStatus = ({ companyId, status:presentStatus }:{status: boolean, companyId: string}) => {
  const [status, setStatus] = useState(presentStatus);
    const dispatch = useAppDispatch();
  const handleToggle = async (checked: boolean) => {
    try {
      dispatch(  updateStatus({ id: Number(companyId), status: checked }));
      setStatus(checked);
    } catch (error) {
    }
  };

  return (
    <div className="flex items-center gap-2">

      <Switch
        checked={status}
        onCheckedChange={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          status ? "bg-teal-500" : "bg-gray-200"
        }`}
      >
        <div
          className={`h-4 w-4 bg-white rounded-full shadow-md transition-transform duration-200 transform ${
            status ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </Switch>
    </div>
  );
};

export default CompanyStatus;
