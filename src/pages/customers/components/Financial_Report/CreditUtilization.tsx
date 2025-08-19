import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { PieChart } from "../Charts_Graphs/PieChart";
import { PieDonutChart } from "../Charts_Graphs/PieChartDonut";

const CreditUtilization = () => {
  const used_credit = 900000;
  const available_credit = 500000;
  return (
    <div className="space-y-3 border border-gray-200 p-5 mt-4 rounded-md bg-white shadow-sm">
      <h1 className="flex text-2xl font-bold items-center gap-2">
        {" "}
        <span>
          <TrendingUp size={20} />
        </span>
        Credit Utilization
      </h1>

      <PieDonutChart available={available_credit} used={used_credit} />

      <div className="flex flex-col justify-around items-center w-full px-5">
        <div className=" flex justify-between items-center rounded-xl py-4 w-full">
          <p className="text-sm font-medium">Credit Limit</p>
          <h1 className="text-md font-semibold">
            ₹ {used_credit + available_credit}
          </h1>
        </div>
        <div className=" flex justify-between items-center rounded-xl py-4 w-full">
          <p className="text-sm font-medium">Used Limit</p>
          <h1 className="text-md font-semibold">₹ {used_credit}</h1>
        </div>
        <div className=" flex justify-between items-center rounded-xl py-4 w-full">
          <p className="text-sm font-medium">Available Limit</p>
          <h1 className="text-md font-semibold">₹ {available_credit}</h1>
        </div>
      </div>
    </div>
  );
};
export default CreditUtilization;
