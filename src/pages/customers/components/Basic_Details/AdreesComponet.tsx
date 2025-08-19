import { AddressTypeConfig } from "@/pages/customer/components/helper";
import { getStateByCode } from "@/pages/customers/codes";

const AdreesComponet = ({ userDetail }: any) => {
  const {
    BldgNoSocietyName,
    City,
    Country_Code,
    FlatNoPlotNoHouseNo,
    Landmark,
    PINCode,
    RoadNoNameAreaLocality,
    State,
  } = userDetail;

  const fullAddress = [
    FlatNoPlotNoHouseNo,
    BldgNoSocietyName,
    RoadNoNameAreaLocality,
    Landmark, 
    City,
    State ? getStateByCode(State) : null,
    PINCode,
    Country_Code?"India":"India", 
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-4 border border-gray-200 p-5 mt-4 rounded-md bg-white shadow-sm">
      <h1 className="text-2xl font-bold">Address Information</h1>
      <AddressTypeConfig
        title="Primary Address"
        value={fullAddress}
        // iconBg="blue"
      />
      <AddressTypeConfig
        title="Alternate Address"
        value={fullAddress}
        // iconBg="purple"
      />
    </div>
  );
};

export default AdreesComponet;
