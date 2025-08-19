import InfoItem, {
  AddressTypeConfig,
} from "@/pages/customer/components/helper";
import { log } from "console";
import { Building2, CircleCheckBig, Luggage } from "lucide-react";
import { getEmploymentStatusBycode } from "../../codes";

const EmployeeComponet = ({ userDetails }: any) => {

  return (
    <div className="space-y-4 border border-gray-200 p-5 mt-4 rounded-md bg-white shadow-sm">
      <h1 className="text-2xl font-bold">Employment Information</h1>
      <div>
        <InfoItem
          icon={<Luggage className="h-5 w-5" />}
          title="Employment Status"
          value={`${
            userDetails?.Employment_Status
              ? getEmploymentStatusBycode(userDetails?.Employment_Status)
              : "Unemployed"
          }`}
          iconBg="blue"
        />
        <InfoItem
          icon={<Building2 className="h-5 w-5" />}
          title="Director Status"
          value={`${
            userDetails?.is_a_director ? "Director" : "Not A Director"
          }`}
          iconBg="purple"
        />
        <InfoItem
          icon={<Luggage className="h-5 w-5" />}
          title="Sole Propritier"
          value={`${
            userDetails?.is_a_sole_proprietor ? "Sole Proprietor" : "No"
          }`}
          iconBg="green"
        />
      </div>
      <hr />
      <div className="ml-5 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Employment Verification</h1>
        <div className="flex gap-2 items-center text-sm">
          <CircleCheckBig className="text-green-500" />
          <p>Employment details verified</p>
        </div>
        <div className="flex gap-2 items-center text-sm ">
          <CircleCheckBig className="text-green-500" />
          <p>Income details verified</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponet;
