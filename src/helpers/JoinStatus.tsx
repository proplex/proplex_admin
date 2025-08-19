import React, { useState } from "react";
import { Switch } from "@radix-ui/react-switch";
import { useAppDispatch } from "@/store/hooks";
import { updatedBooking, updateJoinStatus } from "@/store/features/projectsSlice";

const JoinListStatus = ({ projectId, status:presentStatus }:{   status: boolean, projectId: string}) => {
  const [status, setStatus] = useState(presentStatus);
    const dispatch = useAppDispatch();
  const handleToggle = async (checked: boolean) => {
    try {
      dispatch(updateJoinStatus({ property_id: Number(projectId), join_waitlist: checked }));
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

export default JoinListStatus;
